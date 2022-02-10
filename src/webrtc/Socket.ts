import { trace } from '@/webrtc/utils/log';

const WS = '__WS__';

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
    this.send({ auth: 'username', passwd: 'none' });
  }

  leaveRoom() {
    this.send({ to: this.roomId, type: 'left-room', user: this.peerInfo.nickname });
  }

  destroy() {
    this.ws?.close();
    this.ws = null;
    this.handler = {};
  }

  broadcast(message: any) {
    this.send({ to: this.roomId, type: 'message', message });
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
      this.ws = new WebSocket('ws://achex.ca:4010');
    
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      
      this.ws.onopen = (e: Event) => {
        trace('webSocket', 'open', e);
        resolve();
      };

      this.ws.onerror = (e: Event) => {
        trace('webSocket', 'error', e);
        reject(e);
      };
    });
  }

  private getUsers() {
    this.send({ showusers: 'all' });
  }

  private send(message: any) {
    trace('send', message);
    this.ws?.send(JSON.stringify(message));
  }

  private handleClose(e: CloseEvent) {
    trace('webSocket', 'close', e);
  }

  private handleMessage(e: MessageEvent) {
    const data = JSON.parse(e.data);

    if (data.SID) {                   // 成功登陆，cmd: { auth: username, passwd: 'none' }
      this.clientId = data.SID + '';
      this.send({ setID: this.roomId, passwd: 'none' });
    } else if (data.auth === 'ok') {  // 成功加入房间，cmd: { setID: roomId, passwd: 'none'}
      this.broadcast({
        type: 'peer-join-room',
        peer: {
          ...this.peerInfo,
          id: this.clientId,
        },
        roomId: this.roomId,
      });

      this.getUsers();
    } else if (data.users) {          // 获取用户列表成功，cmd: { showusers: 'all' }
      const peers = Object.entries(data)
        .filter(([k, v]: any) => k !== 'users' && k !== this.clientId && v.UserID === this.roomId)
        .map(([k]: any) => ({
          id: k,
        }));

      trace('receive', 'get users success', peers);
      this.onJoinedRoom?.({
        peer: {
          ...this.peerInfo,
          id: this.clientId,
        },
        peers,
        roomId: this.roomId,
      });
    } else if (data.type === 'left-room') {
      if (data.sID !== this.clientId) {
        trace('receive', `${data.user}(${data.sID}) left room`);
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
      } else {
        this.destroy();
      }
    } else if (data.type === 'message') {
      if (data.sID !== this.clientId) {
        trace('receive', 'message');
        if (this.handler.message) {
          for (let fn of this.handler.message) {
            fn(data.message);
          }
        }
      }
    } else {
      trace('receive', 'other', data);
    }
  }
}

export default Socket.getInstance();