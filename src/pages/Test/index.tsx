import { useEffect, useState } from 'react';
import Room from '@/webrtc/Room';
import Chat from '@/components/Chat';

const room = Room.getInstance('test');

export default () => {
  const [peers, setPeers] = useState<any[]>([]);

  useEffect(() => {
    room.join({nickname: (Math.random() * 1000000 >> 0) + ''}, { video: false, audio: false });

    room.on('change', (pcs: any[]) => {
      setPeers([
        {
          ...room.me!,
          isMe: true,
          videoStream: room.localStream.videoStream,
          audioStream: room.localStream.audioStream,
        },
        ...pcs.map(d => ({
          ...d.peerInfo,
          videoStream: d.remoteStream.videoStream,
          audioStream: d.remoteStream.audioStream,
          pc: d,
        })),
      ]);
    });
  }, []);

  return (
    <div style={{width: 200}}>
      hello world
      {peers.map(d => (
        <p key={d.id}>{d.nickname}</p>
      ))}
      <Chat room={room} />
    </div>
  );
}