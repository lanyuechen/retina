import Peer from './Peer';
import StreamManager from '@/webrtc/StreamManager';
import Recorder from '@/webrtc/Recorder';
import log from "./utils/log";
import Socket from './Socket';

import type { PeerBasicInfo, PeerInfo } from './typings';

const ROOM = '__ROOM__';

export default class Room {
  roomId: string;
  peers: Peer[];
  me: PeerInfo | null = null;
  stream: StreamManager;
  recorder: Recorder | null = null;

  static getInstance(roomId: string) {
    if (!window[ROOM]) {
      window[ROOM] = new Room(roomId);
    }
    return window[ROOM];
  }

  constructor(roomId: string) {
    this.roomId = roomId;
    this.peers = [];
    this.stream = new StreamManager();
  }

  async toggleVideo() {
    await this.stream.toggleRemoteVideoStream(this.peers.map(peer => peer.peerConnection));
    this.peers.forEach(peer => peer.createOffer());
    this.emit('change', this.peers);
  }

  async toggleAudio() {
    await this.stream.toggleRemoteAudioStream(this.peers.map(peer => peer.peerConnection));
    this.peers.forEach(peer => peer.createOffer());
    this.emit('change', this.peers);
  }

  toggleRecord() {
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = null;
    } else if (this.stream.videoStream) {
      this.recorder = new Recorder(this.stream.videoStream);
      this.recorder.start();
    }
  }

  async startShare() {
    await this.stream.startRemoteShareStream(
      this.peers.map(peer => peer.peerConnection),
      undefined,
      () => {
        this.stream.endRemoteShareStream(this.peers.map(peer => peer.peerConnection));
        this.peers.forEach(peer => peer.createOffer());
      }
    );
    this.peers.forEach(peer => peer.createOffer());
  }

  broadcast(message: any) {
    this.peers.forEach(peer => peer.sendMessage(message));
  }

  async join(peerInfo: PeerBasicInfo, constraints?: any) {

    await this.stream.init(constraints);

    Socket.on('message', (message: any) => {
      if (message.type === 'peer-join-room') {
        this.handlePeerJoinRoom(message);
      } else if (message.type === 'peer-leave-room') {
        this.handlePeerLeaveRoom(message.peer.id);
      }
    });

    Socket.joinRoom(this.roomId, peerInfo, this.handleJoinedRoom.bind(this));
  }

  async handleJoinedRoom({ peer, peers, roomId }: {peer: any; peers: any[]; roomId: string}) {
    log.info('room', `${peer.nickname}(myself) joined room “${roomId}”`);

    this.me = peer;

    this.peers = peers.map(d => new Peer({
      localStream: this.stream,
      peerInfo: d,
      onChange: () => this.emit('change', this.peers),
      onDataChannelMessage: (message: any) => this.emit('data-channel-message', message),
    }));

    this.emit('change', this.peers);
  }

  handlePeerJoinRoom({ peer, roomId }: {peer: PeerInfo; roomId: string}) {
    log.info('room', `${peer.nickname} joined room “${roomId}”`);
    const newPeer = new Peer({
      localStream: this.stream,
      peerInfo: peer,
      onChange: () => this.emit('change', this.peers),
      onDataChannelMessage: (message: any) => this.emit('data-channel-message', message),
    });
    newPeer.createOffer();

    this.peers = [...this.peers, newPeer];
    this.emit('change', this.peers);
  }

  handlePeerLeaveRoom(id: string) {
    const peer = this.peers.find(d => d.peerInfo.id === id);
    peer?.destroy();
    this.peers = this.peers.filter(d => d.peerInfo.id !== id);
    this.emit('change', this.peers);
  }

  hangup() {
    Socket.leaveRoom();
  }

  on(key: string, fn: (...args: any) => void) {
    addEventListener(`custom_${key}`, (e: any) => {
      fn(...e.detail);
    });
  }

  emit(key: string, ...args: any) {
    const event = new CustomEvent(`custom_${key}`, { detail: args });
    dispatchEvent(event);
  }

  async getDevices(type?: string) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    if (!type) {
      return devices;
    }
    return devices.filter(d => d.deviceId && d.kind === type);
  }

  destroy() {
    this.stream.destroy();
    this.hangup();
    window[ROOM] = null;
  }
}
