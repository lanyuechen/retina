import Room from './Room';
import { trace } from './utils/log';

export default class Peer {
  id: string;
  peerInfo: any;
  room: Room;
  peerConnection: RTCPeerConnection;
  onChange: () => void;
  remoteStream: MediaStream | undefined;

  constructor({ room, localStream, peerInfo, onChange }: any) {
    this.id = peerInfo.peerId;
    this.peerInfo = peerInfo;
    this.room = room;
    this.onChange = onChange;

    const servers = undefined;

    // Create peer connections and add behavior.
    this.peerConnection = new RTCPeerConnection(servers);
    this.peerConnection.addEventListener('icecandidate', this.handleIceCandidate.bind(this));
    this.peerConnection.addEventListener('iceconnectionstatechange', this.handleConnectionChange.bind(this));
    this.peerConnection.addEventListener('track', this.handleRemoteTrack.bind(this));

    for (let track of localStream.getTracks()) {
      this.peerConnection.addTrack(track, localStream);
    }
  }

  // Connects with new peer candidate.
  handleIceCandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      this.room.sendMessage({
        type: 'candidate',
        id: this.id,
        candidate: {
          type: 'candidate',
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          candidate: event.candidate.candidate,
        }
      });
    }
  }

  // Logs changes to the connection state.
  handleConnectionChange(event: any) {
    const peerConnection = event.target;
    trace(`ICE state: ${peerConnection.iceConnectionState}.`);
  }

  handleRemoteTrack(event: RTCTrackEvent) {
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

  addIceCandidate(candidate: RTCIceCandidate) {
    this.peerConnection.addIceCandidate(candidate);
  }

  async createOffer() {
    trace('发送offser');
    const description = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(description);
    this.room.sendMessage({
      type: description.type,
      id: this.id,
      description,
    });
  }

  async createAnswer() {
    trace('发送answer');
    const description = await this.peerConnection.createAnswer();
    this.peerConnection.setLocalDescription(description);
    this.room.sendMessage({
      type: description.type,
      id: this.id,
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
