import { trace } from "./utils/log.js";
import Peer from './Peer.js';

function getPcId(id1, id2) {
  return [id1, id2].sort().join('-');
}

export default class Room {
  constructor({ roomId, localVideo, onPeerChange }) {
    this.roomId = roomId;
    this.pc = null;

    this.peers = [];
    this.me = null;
    this.onPeerChange = onPeerChange;

    this.mediaStreamConstraints = {
      video: true,
    };

    this.localVideo = localVideo;

    this.join();
  }

  async join() {
    // 连接socket
    this.connect();

    const mediaStream = await navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints);
    this.localStream = mediaStream;
    // this.localVideo.srcObject = mediaStream;

    // 加入房间
    this.socket.emit('joinRoom', this.roomId, {
      nickname: Math.random() + '',  // 昵称
    });
  }

  connect() {
    this.socket = io.connect();

    this.socket.on('joined-room', this.handleJoinedRoom.bind(this));
    this.socket.on('peer-join-room', this.handlePeerJoinRoom.bind(this));
    this.socket.on('peer-leave-room', this.handlePeerLeaveRoom.bind(this));
    this.socket.on('message', this.handleMessage.bind(this));
  }

  initAction() {
    this.startButton = document.querySelector('#startButton');
    this.hangupButton = document.querySelector('#hangupButton');

    this.startButton.addEventListener('click', () => {
      this.join();
    });

    this.hangupButton.addEventListener('click', () => {
      this.hangup();
    });
  }

  async handleJoinedRoom({ peer, peers, roomId }) {
    trace(`${peer.nickname}（本人）加入房间“${roomId}”`);

    this.me = peer;

    this.peers = peers.map(d => new Peer({
      room: this,
      localStream: this.localStream,
      peerInfo: {
        ...d,
        peerId: getPcId(d.clientId, peer.clientId),
      },
      onChange: () => this.onPeerChange([...this.peers]),
    }));
    this.onPeerChange(this.peers);
  }

  handlePeerJoinRoom({ peer, roomId }) {
    trace(`${peer.nickname} 加入房间“${roomId}”`);
    peer = new Peer({
      room: this,
      localStream: this.localStream,
      peerInfo: {
        ...peer,
        peerId: getPcId(this.me.clientId, peer.clientId),
      },
      onChange: () => this.onPeerChange([...this.peers]),
    });
    peer.createOffer();

    this.peers = [...this.peers, peer];
    this.onPeerChange(this.peers);
  }

  handlePeerLeaveRoom(clientId) {
    const peer = this.peers.find(d => d.peerInfo.clientId === clientId);
    peer.destroy();
    this.peers = this.peers.filter(d => d.peerInfo.clientId !== clientId);
    this.onPeerChange(this.peers);
  }

  async handleMessage(message) {
    const pc = this.peers.find(d => d.id === message.id);
    if (!pc) {  // todo 目前消息为广播模式，需要过滤
      return;
    }
    trace('收到消息', message, this.peers);

    if (message.type === 'offer') {
      pc.setRemoteDescription(new RTCSessionDescription(message.description));
      pc.createAnswer();
    } else if (message.type === 'answer') {
      pc.setRemoteDescription(new RTCSessionDescription(message.description));
    } else if (message.type === 'candidate') {
      pc.addIceCandidate(new RTCIceCandidate(message.candidate));
    } else if (message.type === 'bye') {
      this.handleRemoteHangup();
    }
  }

  sendMessage(message) {
    this.socket.emit('message', message);
  }

  handleRemoteHangup() {
    console.log('Session terminated.');
    this.stop();
  }

  hangup() {
    trace('挂断');
    this.socket.disconnect('xxx');
    this.stop();
    this.sendMessage('bye');
  }

  stop() {
    this.pc.destroy();
    this.pc = null;
  }
}
