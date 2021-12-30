## RETINA

### WebRTC建立过程

1. 创建对等连接
```js
const peerConnection = new RTCPeerConnection(servers);
```

2. 添加视频流追踪
```js
const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
mediastream.getTracks().map(track => peerConnection.addTrack(track, mediastream));
```

3. 创建offer，设置localDescription，通过信令通道发送offer
```js
const description = await this.peerConnection.createOffer();
peerConnection.setLocalDescription(description);

sendMessage({
  type: 'offer',
  description: description
});
```

4. setLocalDescription后会触发peerConnection的icecandidate事件，在该事件中通过信令通道向对方发送消息
```js
peerConnection.addEventListener('icecandidate', (event) => {
  sendMessage({
    type: 'candidate',
    candidate: event.candidate
  });
});
```

5. 在信令通道接收到对方发送的candidate，将对方添加为候选人
```js
socket.on('message', (message) => {
  if (message.type === 'candidate') {
    peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
  }
});

```

6. 在信令通道接收到对方发送的offer，将收到的offer设置为remoteDescription，创建answer，设置localDescription，并发送answer
```js
socket.on('message', (message) => {
  if (message.type === 'offer') {
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.description));
    const description = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(description);
    sendMessage({
      type: 'answer',
      description: description
    });
  }
});
```

7. 在信令通道接收到对方发送的answer，将收到的answer设置为remoteDescription
```js
socket.on('message', (message) => {
  if (message.type === 'answer') {
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.description));
  }
});

```