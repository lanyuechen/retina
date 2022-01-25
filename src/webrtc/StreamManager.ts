export default class {
  videoStream: MediaStream | null = null;
  shareStream: MediaStream | null = null;
  audioStream: MediaStream | null = null;

  constructor() {}

  /**
   * 初始化音视频流
   * @param constraints 音视频约束参数
   */
  async init(constraints: MediaStreamConstraints) {
    if (constraints.video || constraints.audio) {
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
  }

  /************************ video相关处理 ************************/

  // 开启/关闭远程视频流
  async toggleRemoteVideoStream(pcs: RTCPeerConnection[], options?: MediaTrackConstraints) {
    if (this.videoStream) {
      return this.endRemoteVideoStream(pcs);
    } else {
      return this.startRemoteVideoStream(pcs, options);
    }
  }

  // 开启远程视频流
  async startRemoteVideoStream(pcs: RTCPeerConnection[], options?: MediaTrackConstraints) {
    const stream = await this.startVideoStream(options);
    this.updateTracks(pcs, stream);

    return stream;
  }

  // 关闭远程视频流
  async endRemoteVideoStream(pcs: RTCPeerConnection[]) {
    this.clearTracks(pcs, 'video');

    return this.endVideoStream();
  }

  // 开启/关闭视频流
  async toggleVideoStream(options?: MediaTrackConstraints) {
    if (this.videoStream) {
      return this.endVideoStream();
    } else {
      return this.startVideoStream(options);
    }
  }

  // 开启视频流
  async startVideoStream(options?: MediaTrackConstraints) {
    if (!this.videoStream) {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: options || true });
    }
    return this.videoStream;
  }

  // 关闭视频流
  async endVideoStream() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.videoStream = null;
    }

    return null;
  }

  /************************ share相关处理，与video对应 ************************/

  async startRemoteShareStream(pcs: RTCPeerConnection[], options?: MediaTrackConstraints, onEnd?: Function) {
    this.clearTracks(pcs, 'video');

    const stream = await this.startShareStream(options);
    this.updateTracks(pcs, stream);

    if (onEnd) {
      stream.getTracks()[0].addEventListener('ended', () => onEnd());
    }

    return stream;
  }

  endRemoteShareStream(pcs: RTCPeerConnection[]) {
    this.clearTracks(pcs, 'video');
    this.endShareStream();

    if (this.videoStream) {
      this.updateTracks(pcs, this.videoStream);
    }
  }

  async startShareStream(options?: MediaTrackConstraints) {
    if (!this.shareStream) {
      this.shareStream = await navigator.mediaDevices.getDisplayMedia({ video: options });
    }
    return this.shareStream;
  }

  endShareStream() {
    if (this.shareStream) {
      this.shareStream.getTracks().forEach((track) => track.stop());
      this.shareStream = null;
    }
  }

  /************************ audio相关处理，与video对应 ************************/

  async toggleRemoteAudioStream(pcs: RTCPeerConnection[]) {
    if (this.audioStream) {
      return this.endRemoteAudioStream(pcs);
    } else {
      return this.startRemoteAudioStream(pcs);
    }
  }

  async startRemoteAudioStream(pcs: RTCPeerConnection[]) {
    const stream = await this.startAudioStream();
    this.updateTracks(pcs, stream);
    return stream;
  }

  async endRemoteAudioStream(pcs: RTCPeerConnection[]) {
    this.clearTracks(pcs, 'audio');

    return this.endAudioStream();
  }

  async toggleAudioStream(options?: MediaTrackConstraints) {
    if (this.audioStream) {
      return this.endAudioStream();
    } else {
      return this.startAudioStream(options);
    }
  }

  async startAudioStream(options?: MediaTrackConstraints) {
    if (!this.audioStream) {
      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: options || true });
    }
    return this.audioStream;
  }

  async endAudioStream() {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach((track) => track.stop());
      this.audioStream = null;
    }

    return null;
  }

  /************************ 其他 ************************/

  initTracks(pc: RTCPeerConnection) {
    if (this.shareStream) {
      this.updateTracks([pc], this.shareStream);
    } else if (this.videoStream) {
      this.updateTracks([pc], this.videoStream);
    }

    if (this.audioStream) {
      this.updateTracks([pc], this.audioStream);
    }
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
  
  updateTracks(pcs: RTCPeerConnection[], stream: MediaStream) {
    stream.getTracks().forEach((track) => {
      pcs.forEach((pc) => {
        pc.addTrack(track);
      });
    });
  }

  clearTracks(pcs: RTCPeerConnection[], type?: string) {
    pcs.forEach((pc) => {
      pc.getSenders().forEach((sender) => {
        if (!type || sender.track?.kind === type) {
          pc.removeTrack(sender);
        }
      });
    });
  }

  destroy() {
    this.endVideoStream();
    this.endAudioStream();
  }
}
