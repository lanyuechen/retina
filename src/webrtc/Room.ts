import io, { Socket } from 'socket.io-client';
import Peer from './Peer';
import { trace } from "./utils/log";
import { getPcId } from './utils/utils';

import type { RoomInitParams, PeerBasicInfo, PeerInfo, Message } from './typings';

export default class Room {
  roomId: string;
  peers: Peer[];
  me: PeerInfo | null;
  localStream: MediaStream | undefined;
  socket: Socket | undefined;
  onChange: any;
  mediaStreamConstraints: any;

  constructor({ roomId, onChange }: RoomInitParams) {
    this.roomId = roomId;
    this.peers = [];
    this.me = null;
    this.mediaStreamConstraints = {
      video: true,
    };
    this.onChange = onChange;
  }

  async join(peerInfo: PeerBasicInfo) {
    // 连接socket
    this.connect();

    const mediaStream = await navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints);
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
      localStream: this.localStream!,
      peerInfo: {
        ...d,
        id: getPcId(d.clientId, peer.clientId),
      },
      onChange: () => this.onChange([...this.peers]),
    }));
    this.onChange(this.peers);
  }

  handlePeerJoinRoom({ peer, roomId }: {peer: PeerInfo; roomId: string}) {
    trace(`${peer.nickname} 加入房间“${roomId}”`);
    const newPeer = new Peer({
      room: this,
      localStream: this.localStream!,
      peerInfo: {
        ...peer,
        id: getPcId(this.me!.clientId, peer.clientId),
      },
      onChange: () => this.onChange([...this.peers]),
    });
    newPeer.createOffer();

    this.peers = [...this.peers, newPeer];
    this.onChange(this.peers);
  }

  handlePeerLeaveRoom(clientId: string) {
    const peer = this.peers.find(d => d.peerInfo.clientId === clientId);
    peer?.destroy();
    this.peers = this.peers.filter(d => d.peerInfo.clientId !== clientId);
    this.onChange(this.peers);
  }

  async handleMessage(message: Message) {
    const pc = this.peers.find(d => d.peerInfo.id === message.id);
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
    }
  }

  sendMessage(message: any) {
    this.socket?.emit('message', message);
  }

  hangup() {
    trace('挂断');
    this.socket?.disconnect();
  }
}
