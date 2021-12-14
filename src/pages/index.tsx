import React, { useEffect, useRef, useState } from 'react';

import Video from '@/components/Video';

import Peer from '@/webrtc/Peer';
import Room from '@/webrtc/Room';

export default () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [peers, setPeers] = useState<Peer[]>([]);

  const handlePeerChange = (pcs: Peer[]) => {
    setPeers(pcs);
  }

  useEffect(() => {
    new Room({
      roomId: 'foo',
      localVideo: ref.current,
      onPeerChange: handlePeerChange,
    });
  }, []);

  return (
    <div>
      <video ref={ref} autoPlay playsInline />
      {peers.map(d => (
        <Video key={d.id} src={d.remoteStream} />
      ))}
    </div>
  );
}