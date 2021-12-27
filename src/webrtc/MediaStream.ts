
export default class {
  videoStream?: MediaStream | null;
  audioStream?: MediaStream | null;

  constructor() {
    
  }

  async init(constraints: any) {
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoTracks = mediaStream.getVideoTracks();
    if (videoTracks.length) {
      this.videoStream = new MediaStream(videoTracks);
    }

    const audioTracks = mediaStream.getAudioTracks();
    if (audioTracks.length) {
      this.audioStream = new MediaStream(audioTracks);
    }
  }

  async toggleVideoStream(options?: any) {
    if (this.videoStream) {
      return this.removeVideoStream();
    } else {
      return this.addVideoStream(options);
    }
  }

  async addVideoStream(options?: any) {
    this.videoStream = await navigator.mediaDevices.getUserMedia({video: options || true});
    return this.videoStream;
  }

  async removeVideoStream() {
    this.videoStream?.getTracks().forEach(track => track.stop());
    this.videoStream = null;
    return null;
  }

  async toggleAudioStream(options?: any) {
    if (this.audioStream) {
      return this.removeAudioStream();
    } else {
      return this.addAudioStream(options);
    }
  }

  async addAudioStream(options?: any) {
    this.audioStream = await navigator.mediaDevices.getUserMedia({audio: options || true});
    return this.audioStream;
  }

  async removeAudioStream() {
    this.audioStream?.getTracks().forEach(track => track.stop());
    this.audioStream = null;
    return null;
  }

  addTrack(track: MediaStreamTrack) {
    if (track.kind === 'video') {
      if (!this.videoStream) {
        this.videoStream = new MediaStream();
      }
      this.videoStream.addTrack(track);
    } else if (track.kind === 'audio') {
      if (!this.audioStream) {
        this.audioStream = new MediaStream();
      }
      this.audioStream.addTrack(track);
    }
  }

  destroy() {
    this.removeVideoStream();
    this.removeAudioStream();
  }
}