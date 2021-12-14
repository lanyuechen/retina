import { trace } from "./utils/log.js";

export default class Peer {
  constructor({ room, localStream, peerInfo, onChange }) {
    this.id = peerInfo.peerId;
    this.peerInfo = peerInfo;
    this.room = room;
    this.peerConnection = null;
    this.remoteVideo = null;
    this.onChange = onChange;

    const servers = null;

    // Create peer connections and add behavior.
    this.peerConnection = new RTCPeerConnection(servers);
    this.peerConnection.addEventListener('icecandidate', this.handleIceCandidate.bind(this));
    this.peerConnection.addEventListener('iceconnectionstatechange', this.handleConnectionChange.bind(this));
    this.peerConnection.addEventListener('track', this.handleRemoteTrack.bind(this));

    for (let track of localStream.getTracks()) {
      this.peerConnection.addTrack(track, localStream);
    }

    this.initRemoteVideo();
  }

  initRemoteVideo() {
    this.remoteVideo = document.createElement('video');
    this.remoteVideo.id =`${this.id}`;
    this.remoteVideo.setAttribute('autoplay', true);
    this.remoteVideo.setAttribute('playsinline', true);
  }

  // Connects with new peer candidate.
  handleIceCandidate(event) {
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
  handleConnectionChange(event) {
    const peerConnection = event.target;
    trace(`ICE state: ${peerConnection.iceConnectionState}.`);
  }

  handleRemoteTrack(event) {
    if (event.streams && event.streams[0]) {
      this.remoteVideo.srcObject = event.streams[0];
      this.remoteStream = event.streams[0];
    } else {
      this.remoteVideo.srcObject = new MediaStream(event.track);
      this.remoteStream = new MediaStream(event.track);
    }
    this.onChange();
  }

  addIceCandidate(candidate) {
    this.peerConnection.addIceCandidate(candidate);
  }

  async createOffer() {
    trace('发送offser');
    const description = await this.peerConnection.createOffer(this.offerOptions);
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

  setRemoteDescription(description) {
    trace('setRemoteDescription', description);
    this.peerConnection.setRemoteDescription(description);
  }

  destroy() {
    this.peerConnection.close();
    this.peerConnection = null;
  }
}
