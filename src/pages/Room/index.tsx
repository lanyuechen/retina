import React, { useEffect, useState } from 'react';

import { Drawer } from '@mui/material';

import Peer from '@/webrtc/Peer';

import Chat from '@/components/Chat';
import useQuery from '@/utils/use-query';
import useRoom from '@/utils/use-room';

import Header from './Header';
import Content from './Content';
import Toolbar from './Toolbar';
import PeerList from './PeerList';

import style from './style.less';

import type { PeerState } from './typings';

export default () => {
  const { u: username, v: video, a: audio } = useQuery();

  const [peers, setPeers] = useState<PeerState[]>([]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [layout, setLayout] = useState<string>('gallery');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const room = useRoom();

  useEffect(() => {
    room.getDevices().then((mediaDevices: MediaDeviceInfo[]) => {
      setDevices(mediaDevices);
    });

    room.join({nickname: username}, {video, audio});

    room.on('change', (pcs: Peer[]) => {
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

  const handleLayoutChange = (type: string) => {
    setLayout(type);
  }

  const handleAction = (key: string) => {
    if (key === 'show-peers') {
      setDrawerVisible(!drawerVisible);
    } else if (key === 'toggle-video') {
      room.toggleVideo();
    } else if (key === 'toggle-audio') {
      room.toggleAudio();
    } else if (key === 'leave') {
      room.hangup();
    } else if (key === 'share') {
      // todo share screen
    }
  }

  return (
    <div className={style.room}>
      <div className={style.left} style={{paddingRight: drawerVisible ? 320 : 0}}>
        <div className={style.header}>
          <Header layout={layout} onLayoutChange={handleLayoutChange} />
        </div>
        <div className={style.content}>
          <Content layout={layout} peers={peers} />
        </div>
        {peers[0] && (
          <div className={style.footer}>
            <Toolbar
              peers={peers}
              devices={devices}
              onAction={handleAction}
            />
          </div>
        )}
      </div>
      <Drawer
        variant="persistent"
        open={drawerVisible}
        anchor="right"
        ModalProps={{
          keepMounted: true,
        }}
        hideBackdrop
        elevation={1}
        onClose={() => setDrawerVisible(false)}
      >
        <PeerList peers={peers} />
      </Drawer>
      <Chat />
    </div>
  );
}