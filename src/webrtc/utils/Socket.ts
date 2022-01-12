import { trace } from '@/webrtc/utils/log';

const WS = '__WS__';

class Socket {
  ws!: WebSocket;
  sid?: string; 
  room?: string;
  handler: {[key: string]: Function[]} = {};
  peerInfo: any;
  onJoinedRoom?: Function;

  static getInstance() {
    if (!window[WS]) {
      window[WS] = new Socket();
    }
    return window[WS];
  }

  constructor() {
    this.connect();
  }

  connect() {
    this.ws = new WebSocket('wss://ws.achex.ca');
    
    this.ws.onmessage = this.handleMessage.bind(this);
    this.ws.onopen = this.handleOpen.bind(this);
    this.ws.onclose = this.handleClose.bind(this);
    this.ws.onerror = this.handleError.bind(this);
  }

  handleOpen(e: Event) {
    trace('webSocket', 'open', e);
  }

  handleClose(e: CloseEvent) {
    trace('webSocket', 'close', e);
  }

  handleError(e: Event) {
    trace('webSocket', 'error', e);
  }

  handleMessage(e: MessageEvent) {
    const data = JSON.parse(e.data);

    if (data.auth === 'OK') {
      // 登录成功
      trace('receive', 'login success');
      this.sid = data.SID;
    } else if (data.joinHub === 'OK') {
      // 加入房间成功
      trace('receive', 'join room success');
      this.broadcast({
        type: 'peer-join-room',
        peer: {
          ...this.peerInfo,
          clientId: this.sid,
        },
        roomId: this.room,
      });

      this.getUsers();
    } else if (data.users) {
      // 获取用户列表成功
      const peers = data.users
        .filter((user: any, i: number) => i > 0 &&  user.hub === this.room && this.peerInfo.nickname !== user.username)
        .map((user: any) => ({
          nickname: user.username,
          clientId: user.session,
        }));
      this.onJoinedRoom?.({
        peer: {
          ...this.peerInfo,
          clientId: this.sid,
        },
        peers,
        roomId: this.room,
      });
    } else if (data.leftHub) {
      trace('receive', `${data.username}(${data.sID}) left room`);
      if (this.handler.message) {
        for (let fn of this.handler.message) {
          fn({
            type: 'peer-leave-room',
            peer: {
              nickname: data.username,
              clientId: data.sID,
            }
          });
        }
      }
    } else if (data.type === 'message') {
      trace('receive', 'message');
      if (this.handler.message) {
        for (let fn of this.handler.message) {
          fn(data.message);
        }
      }
    } else {
      trace('receive', 'other', data);
    }
  }

  login(username: string) {
    this.send({ auth: username, passwd: '123456' });
  }

  joinRoom(name: string, peerInfo: any, onJoinedRoom: Function) {
    this.onJoinedRoom = onJoinedRoom;
    this.room = name;
    this.peerInfo = peerInfo;

    this.login(peerInfo.nickname);
    this.send({ joinHub: name });
  }

  leaveRoom() {
    this.send({ leaveHub: this.room });
  }

  broadcast(message: any) {
    this.send({ toH: this.room, type: 'message', message });
  }

  on(key: string, cb: Function) {
    this.handler[key] = this.handler[key] || [];
    this.handler[key].push(cb);
  }

  getUsers() {
    this.send({ 'serverstat': true });
  }

  send(message: any) {
    trace('send', message);
    this.ws.send(JSON.stringify(message));
  }
}

export default Socket.getInstance();