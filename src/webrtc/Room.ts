import io, { Socket } from 'socket.io-client';
import Peer from './Peer';
import MStream from '@/webrtc/MediaStream';
import { trace } from "./utils/log";
import { getPcId } from './utils/utils';

import type { PeerBasicInfo, PeerInfo } from './typings';

const ROOM = '__ROOM__';

export default class Room {
  roomId: string;
  peers: Peer[];
  me: PeerInfo | null = null;
  localStream: MStream;
  socket: Socket | undefined;
  mediaStreamConstraints: any;
  video: boolean = false;
  audio: boolean = false;

  static getInstance(roomId: string) {
    if (!window[ROOM]) {
      window[ROOM] = new Room(roomId);
    }
    return window[ROOM];
  }

  constructor(roomId: string) {
    this.roomId = roomId;
    this.peers = [];
    this.localStream = new MStream();
  }

  toggleVideo() {
    this.peers.forEach(pc => pc.setMute('video', this.video));
    this.video = !this.video;
    this.emit('change', this.peers);
  }

  toggleAudio() {
    this.peers.forEach(pc => pc.setMute('audio', this.audio));
    this.audio = !this.audio;
    this.emit('change', this.peers);
  }

  async join(peerInfo: PeerBasicInfo, constraints?: any) {
    this.mediaStreamConstraints = constraints || {
      video: true,
      audio: true,
    };

    this.video = !!this.mediaStreamConstraints.video;
    this.audio = !!this.mediaStreamConstraints.audio;

    // 连接socket
    this.connect();

    await this.localStream.init(this.mediaStreamConstraints);

    // 加入房间
    this.socket?.emit('joinRoom', this.roomId, peerInfo);
  }

  connect() {
    this.socket = io(localStorage.serverAddr);

    this.socket.on('joined-room', this.handleJoinedRoom.bind(this));
    this.socket.on('peer-join-room', this.handlePeerJoinRoom.bind(this));
    this.socket.on('peer-leave-room', this.handlePeerLeaveRoom.bind(this));
  }

  async handleJoinedRoom({ peer, peers, roomId }: {peer: any; peers: any[]; roomId: string}) {
    trace(`${peer.nickname}（本人）加入房间“${roomId}”`);

    this.me = peer;

    this.peers = peers.map(d => new Peer({
      socket: this.socket!,
      localStream: this.localStream!,
      peerInfo: {
        ...d,
        id: getPcId(d.clientId, peer.clientId),
      },
      onChange: () => this.emit('change', this.peers),
    }));

    this.emit('change', this.peers);
  }

  handlePeerJoinRoom({ peer, roomId }: {peer: PeerInfo; roomId: string}) {
    trace(`${peer.nickname} 加入房间“${roomId}”`);
    const newPeer = new Peer({
      socket: this.socket!,
      localStream: this.localStream!,
      peerInfo: {
        ...peer,
        id: getPcId(this.me!.clientId, peer.clientId),
      },
      onChange: () => this.emit('change', this.peers),
    });
    newPeer.createOffer();

    this.peers = [...this.peers, newPeer];
    this.emit('change', this.peers);
  }

  handlePeerLeaveRoom(clientId: string) {
    const peer = this.peers.find(d => d.peerInfo.clientId === clientId);
    peer?.destroy();
    this.peers = this.peers.filter(d => d.peerInfo.clientId !== clientId);
    this.emit('change', this.peers);
  }

  hangup() {
    trace('挂断');
    this.socket?.disconnect();
  }

  on(key: string, fn: (...args: any) => void) {
    addEventListener(key, (e: any) => {
      fn(...e.detail);
    });
  }

  emit(key: string, ...args: any) {
    const event = new CustomEvent(key, { detail: args });
    dispatchEvent(event);
  }
}
