import { trace } from './utils/log';
import { noop } from './utils/utils';

import type { Socket } from 'socket.io-client';
import type { PeerInfo, PeerInitParams, Message } from './typings';

export default class Peer {
  peerInfo: PeerInfo;
  socket: Socket;
  peerConnection: RTCPeerConnection;
  remoteStream: MediaStream | undefined;
  onChange: () => void;

  video: boolean = false;
  audio: boolean = false;

  constructor({ socket, localStream, peerInfo, onChange }: PeerInitParams) {
    this.socket = socket;
    this.peerInfo = peerInfo;
    this.onChange = onChange || noop;

    const servers = undefined;

    this.peerConnection = new RTCPeerConnection(servers);
    this.peerConnection.addEventListener('icecandidate', this.handleIceCandidate.bind(this));
    this.peerConnection.addEventListener('iceconnectionstatechange', this.handleConnectionChange.bind(this));
    this.peerConnection.addEventListener('track', this.handleRemoteTrack.bind(this));

    this.socket.on('message', this.handleMessage.bind(this));

    localStream.getTracks().map(track => {
      if (track.kind === 'video') {
        this.video = true;
      }
      if (track.kind === 'audio') {
        this.audio = true;
      }
      this.peerConnection.addTrack(track);
    });
  }

  // 当调用PeerConnection.setLocalDescription()后触发，并发消息给其他用户
  handleIceCandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      this.sendMessage({
        type: 'candidate',
        id: this.peerInfo.id,
        candidate: {
          type: 'candidate',
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          candidate: event.candidate.candidate,
        }
      });
    }
  }

  // iceconnection 状态监控
  handleConnectionChange(event: any) {
    const peerConnection = event.target;
    trace(`ICE state: ${peerConnection.iceConnectionState}.`);
  }

  handleRemoteTrack(event: RTCTrackEvent) {
    trace('remote track', event);
    if (event.streams && event.streams[0]) {
      this.remoteStream = event.streams[0];
    } else {
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
      }
      this.remoteStream.addTrack(event.track);
    }
    this.onChange();
  }

  async handleMessage(message: Message) {
    if (this.peerInfo.id !== message.id) {
      return;
    }
    trace('收到消息', message);

    if (message.type === 'offer') {
      this.setRemoteDescription(new RTCSessionDescription(message.description));
      this.createAnswer();
    } else if (message.type === 'answer') {
      this.setRemoteDescription(new RTCSessionDescription(message.description));
    } else if (message.type === 'candidate') {
      this.addIceCandidate(new RTCIceCandidate(message.candidate));
    } else if (message.type === 'state') {
      Object.assign(this, message.state);
      this.onChange();
    }
  }

  setMute(type: 'audio' | 'video', muting: boolean) {
    this.peerConnection.getSenders().forEach(sender => {
      if (sender.track?.kind === type) {
        sender.track.enabled = !muting;
      }
    });
    this.sendMessage({
      type: 'state',
      state: {
        [type]: !muting,
      }
    });
  }

  addIceCandidate(candidate: RTCIceCandidate) {
    this.peerConnection.addIceCandidate(candidate);
  }

  async createOffer() {
    trace('发送offser');
    const description = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(description);
    this.sendMessage({
      type: description.type,
      id: this.peerInfo.id,
      description,
    });
  }

  async createAnswer() {
    trace('发送answer');
    const description = await this.peerConnection.createAnswer();
    this.peerConnection.setLocalDescription(description);
    this.sendMessage({
      type: description.type,
      id: this.peerInfo.id,
      description,
    });
  }

  setRemoteDescription(description: RTCSessionDescription) {
    trace('setRemoteDescription', description);
    this.peerConnection.setRemoteDescription(description);
  }

  sendMessage(message: any) {
    this.socket?.emit('message', message);
  }

  destroy() {
    this.peerConnection.close();
  }
}
