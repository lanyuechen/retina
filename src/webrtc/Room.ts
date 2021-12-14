import { trace } from "./utils/log";
import io, { Socket } from 'socket.io-client';
import Peer from './Peer';

function getPcId(id1: string, id2: string) {
  return [id1, id2].sort().join('-');
}

const mediaStreamConstraints = {
  video: true,
};

export default class Room {
  roomId: string;
  peers: Peer[];
  me: any;
  localStream: MediaStream | undefined;
  socket: Socket | undefined;
  onPeerChange: (peers: Peer[]) => void;

  constructor({ roomId, onPeerChange }: any) {
    this.roomId = roomId;

    this.peers = [];
    this.me = null;
    this.onPeerChange = onPeerChange;
  }

  async join(peerInfo: any) {
    // 连接socket
    this.connect();

    const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
    this.localStream = mediaStream;

    // 加入房间
    this.socket?.emit('joinRoom', this.roomId, peerInfo);
  }

  connect() {
    this.socket = io();

    this.socket.on('joined-room', this.handleJoinedRoom.bind(this));
    this.socket.on('peer-join-room', this.handlePeerJoinRoom.bind(this));
    this.socket.on('peer-leave-room', this.handlePeerLeaveRoom.bind(this));
    this.socket.on('message', this.handleMessage.bind(this));
  }

  async handleJoinedRoom({ peer, peers, roomId }: {peer: any; peers: any[]; roomId: string}) {
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

  handlePeerJoinRoom({ peer, roomId }: {peer: any; roomId: string}) {
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

  handlePeerLeaveRoom(clientId: string) {
    const peer = this.peers.find(d => d.peerInfo.clientId === clientId);
    peer?.destroy();
    this.peers = this.peers.filter(d => d.peerInfo.clientId !== clientId);
    this.onPeerChange(this.peers);
  }

  async handleMessage(message: any) {
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

  sendMessage(message: any) {
    this.socket?.emit('message', message);
  }

  handleRemoteHangup() {
    this.stop();
  }

  hangup() {
    trace('挂断');
    this.socket?.disconnect();
    this.stop();
    this.sendMessage('bye');
  }

  stop() {

  }
}
