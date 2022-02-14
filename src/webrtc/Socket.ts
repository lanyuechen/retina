import log from '@/webrtc/utils/log';

const WS = '__WS__';
const WS_URL = 'wss://cloud.achex.ca';

class Socket {
  private ws?: WebSocket | null;
  private handler: {[key: string]: Function[]} = {};
  clientId?: string;
  roomId?: string;
  peerInfo: any;
  onJoinedRoom?: Function;

  static getInstance() {
    if (!window[WS]) {
      window[WS] = new Socket();
    }
    return window[WS];
  }

  constructor() {

  }

  async joinRoom(roomId: string, peerInfo: any, onJoinedRoom: Function) {
    this.onJoinedRoom = onJoinedRoom;
    this.roomId = roomId;
    this.peerInfo = peerInfo;

    await this.connect();
    this.login(peerInfo.nickname);
    this.send({ joinHub: roomId });
  }

  leaveRoom() {
    this.ws?.close();
    this.ws = null;
    this.handler = {};
    // this.send({ leaveHub: this.roomId });
  }

  broadcast(message: any) {
    this.send({ toH: this.roomId, type: 'message', message });
  }

  sendTo(id: string, message: any) {
    this.send({ toS: id, type: 'message', message });
  }

  on(key: 'message', cb: Function) {
    this.handler[key] = this.handler[key] || [];
    this.handler[key].push(cb);
  }

  private connect() {
    return new Promise<void>((resolve, reject) => {
      this.ws = new WebSocket(WS_URL);
    
      this.ws.onclose = (e: CloseEvent) => {
        log.info('WebSocket', 'onclose', e);
      }

      this.ws.onmessage = (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        log.info('WebSocket', 'Received message', data);
        this.handleMessage(data);
      }
      
      this.ws.onopen = (e: Event) => {
        log.info('WebSocket', 'Connected success', e);
        resolve();
      };

      this.ws.onerror = (e: Event) => {
        log.error('WebSocket', 'onerror', e);
        reject(e);
      };
    });
  }

  private login(username: string) {
    this.send({ auth: username, passwd: '123456' });
  }

  private getUsers() {
    this.send({ 'serverstat': true });
  }

  private send(message: any) {
    log.info('WebSocket', 'Send message', message);
    this.ws?.send(JSON.stringify(message));
  }

  private handleMessage(data: any) {
    if (data.auth === 'OK') {
      // 登录成功
      log.info('achex', 'Login success');
      this.clientId = data.SID;
    } else if (data.joinHub === 'OK') {
      // 加入房间成功
      log.info('achex', 'Join room success');
      this.broadcast({
        type: 'peer-join-room',
        peer: {
          ...this.peerInfo,
          id: this.clientId,
        },
        roomId: this.roomId,
      });

      this.getUsers();
    } else if (data.users) {
      // 获取用户列表成功
      const peers = data.users
        .filter((user: any, i: number) => i > 0 &&  user.hub === this.roomId && this.peerInfo.nickname !== user.username)
        .map((user: any) => ({
          nickname: user.username,
          id: user.session,
        }));

      log.info('achex', 'Get peers(not include me) success', peers);

      this.onJoinedRoom?.({
        peer: {
          ...this.peerInfo,
          id: this.clientId,
        },
        peers,
        roomId: this.roomId,
      });
    } else if (data.leftHub) {
      log.info('achex', `${data.user}(${data.sID}) left room`);
      if (this.handler.message) {
        for (let fn of this.handler.message) {
          fn({
            type: 'peer-leave-room',
            peer: {
              nickname: data.user,
              id: data.sID,
            }
          });
        }
      }
    } else if (data.type === 'message') {
      log.info('achex', 'Received message');
      if (this.handler.message) {
        for (let fn of this.handler.message) {
          fn(data.message);
        }
      }
    }
  }
}

export default Socket.getInstance();