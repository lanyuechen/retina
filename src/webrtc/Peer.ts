import log from './utils/log';
import { noop } from './utils/utils';
import Socket from './Socket';

import StreamManager from '@/webrtc/StreamManager';

import type { PeerInfo, PeerInitParams, Message } from './typings';

export default class Peer {
  peerInfo: PeerInfo;
  peerConnection: RTCPeerConnection;
  dataChannel: RTCDataChannel;
  stream: StreamManager;
  onChange: () => void;
  onDataChannelMessage: (message: any) => void;

  constructor({ localStream, peerInfo, onChange, onDataChannelMessage }: PeerInitParams) {
    this.peerInfo = peerInfo;
    this.onChange = onChange || noop;
    this.onDataChannelMessage = onDataChannelMessage || noop;

    const servers = {
      iceServers: [
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        },
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun.voipbuster.com:3478',
            'stun:stun.wirlab.net'
          ]
        }
      ]
    };

    this.peerConnection = new RTCPeerConnection(servers);
    this.peerConnection.addEventListener('icecandidate', this.handleIceCandidate.bind(this));
    this.peerConnection.addEventListener('iceconnectionstatechange', this.handleConnectionChange.bind(this));
    this.peerConnection.addEventListener('track', this.handleRemoteTrack.bind(this));

    this.dataChannel = this.peerConnection.createDataChannel('datachannel', {negotiated: true, id: 0}); // 协商方式
    this.dataChannel.addEventListener('open', this.handleDataChannelChange.bind(this));
    this.dataChannel.addEventListener('close', this.handleDataChannelChange.bind(this));
    this.dataChannel.addEventListener('message', this.handleDataChannelMessage.bind(this));

    Socket.on('message', this.handleMessage.bind(this));

    this.stream = new StreamManager();

    localStream.initTracks(this.peerConnection);
  }

  // 当调用PeerConnection.setLocalDescription()后触发，并发消息给其他用户
  handleIceCandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      Socket.sendTo(this.peerInfo.id, {
        type: 'candidate',
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
    log.info('webRTC', 'ICE state', peerConnection.iceConnectionState);
  }

  handleRemoteTrack(event: RTCTrackEvent) {
    log.info('webRTC', 'RemoteTrack', event);

    if (event.track.kind === 'video') {
      this.stream.endVideoStream();
    } else if (event.track.kind === 'audio') {
      this.stream.endAudioStream();
    }

    this.stream.addTrack(event.track);
    
    this.onChange();
  }

  handleDataChannelChange() {
    log.info('webRTC', `DataChannel state changed: ${this.dataChannel.readyState}`);
  }

  handleDataChannelMessage(event: MessageEvent) {
    const message = JSON.parse(event.data);
    log.info('webRTC', 'DataChannel received message', message);
    this.onDataChannelMessage(message);
  }

  handleMessage(message: Message) {
    log.info('Socket', 'onMessage', message);

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
    log.info('webRTC', 'dataChannel', 'send message', message);
    this.dataChannel.send(JSON.stringify(message));
  }

  addIceCandidate(candidate: RTCIceCandidate) {
    if (this.peerConnection.signalingState !== 'closed') {
      log.info('webRTC', 'addIceCandidate', {signalingState: this.peerConnection.signalingState});
      this.peerConnection.addIceCandidate(candidate);
    }
  }

  async createOffer() {
    if (this.peerConnection.signalingState === 'closed') {
      return;
    }
    log.info('webRTC', 'createOffer', {signalingState: this.peerConnection.signalingState});
    const description = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(description);
    Socket.sendTo(this.peerInfo.id, {
      type: description.type,
      description,
    });
  }

  async createAnswer() {
    if (this.peerConnection.signalingState === 'closed') {
      return;
    }
    log.info('webRTC', 'createAnswer', {signalingState: this.peerConnection.signalingState});
    const description = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(description);
    Socket.sendTo(this.peerInfo.id, {
      type: description.type,
      description,
    });
  }

  setRemoteDescription(description: RTCSessionDescription) {
    if (this.peerConnection.signalingState !== 'closed') {
      log.info('webRTC', 'setRemoteDescription', description, {signalingState: this.peerConnection.signalingState});
      this.peerConnection.setRemoteDescription(description);
    }
  }

  destroy() {
    this.peerConnection.close();
  }
}
