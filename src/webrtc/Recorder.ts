
export default class {
  mediaRecorder: MediaRecorder;

  // eslint-disable-next-line no-undef
  constructor(stream: MediaStream, options?: MediaRecorderOptions) {
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm',
    });

    this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
  }

  start() {
    this.mediaRecorder.start();
  }

  stop() {
    this.mediaRecorder.stop();
  }

  pause() {
    this.mediaRecorder.pause();
  }

  resume() {
    this.mediaRecorder.resume();
  }

  handleDataAvailable(event: BlobEvent) {
    if (event.data.size > 0) {
      this.download([event.data]);
    }
  }

  download(chunks: Blob[]) {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${new Date().toISOString()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
