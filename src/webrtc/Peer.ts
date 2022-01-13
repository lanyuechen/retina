import { trace } from './utils/log';
import { noop } from './utils/utils';
import Socket from './Socket';

import StreamManager from '@/webrtc/StreamManager';

import type { PeerInfo, PeerInitParams, Message } from './typings';

export default class Peer {
  peerInfo: PeerInfo;
  peerConnection: RTCPeerConnection;
  dataChannel: RTCDataChannel;
  remoteStream: StreamManager;
  onChange: () => void;
  onDataChannelMessage: (message: any) => void;

  constructor({ localStream, peerInfo, onChange, onDataChannelMessage }: PeerInitParams) {
    this.peerInfo = peerInfo;
    this.onChange = onChange || noop;
    this.onDataChannelMessage = onDataChannelMessage || noop;

    const servers = undefined;

    this.peerConnection = new RTCPeerConnection(servers);
    this.peerConnection.addEventListener('icecandidate', this.handleIceCandidate.bind(this));
    this.peerConnection.addEventListener('iceconnectionstatechange', this.handleConnectionChange.bind(this));
    this.peerConnection.addEventListener('track', this.handleRemoteTrack.bind(this));

    this.dataChannel = this.peerConnection.createDataChannel('datachannel', {negotiated: true, id: 0}); // 协商方式
    this.dataChannel.addEventListener('open', this.handleDataChannelChange.bind(this));
    this.dataChannel.addEventListener('close', this.handleDataChannelChange.bind(this));
    this.dataChannel.addEventListener('message', this.handleDataChannelMessage.bind(this));

    Socket.on('message', this.handleMessage.bind(this));

    this.remoteStream = new StreamManager();

    localStream.addRemoteTrack(this.peerConnection);
  }

  // 当调用PeerConnection.setLocalDescription()后触发，并发消息给其他用户
  handleIceCandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      Socket.broadcast({
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
    this.remoteStream.endVideoStream();
    this.remoteStream.endAudioStream();
    if (event.streams && event.streams[0]) {
      event.streams[0].getTracks().forEach(track => {
        this.remoteStream.addTrack(track);
      });
    } else {
      this.remoteStream.addTrack(event.track);
    }
    this.onChange();
  }

  handleDataChannelChange() {
    trace(`dataChannel state: ${this.dataChannel.readyState}`);
  }

  handleDataChannelMessage(event: MessageEvent) {
    const message = JSON.parse(event.data);
    trace('dataChannel', 'receive message', message);
    this.onDataChannelMessage(message);
  }

  handleMessage(message: Message) {
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
    }
  }

  sendMessage(message: any) {
    trace('dataChannel', 'send message', message);
    this.dataChannel.send(JSON.stringify(message));
  }

  addIceCandidate(candidate: RTCIceCandidate) {
    this.peerConnection.addIceCandidate(candidate);
  }

  async createOffer() {
    trace('发送offser');
    const description = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(description);
    Socket.broadcast({
      type: description.type,
      id: this.peerInfo.id,
      description,
    });
  }

  async createAnswer() {
    trace('发送answer');
    const description = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(description);
    Socket.broadcast({
      type: description.type,
      id: this.peerInfo.id,
      description,
    });
  }

  setRemoteDescription(description: RTCSessionDescription) {
    trace('setRemoteDescription', description);
    this.peerConnection.setRemoteDescription(description);
  }

  destroy() {
    this.peerConnection.close();
  }
}
