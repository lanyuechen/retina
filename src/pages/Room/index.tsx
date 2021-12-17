import React, { useEffect, useState } from 'react';

import { Drawer } from 'antd';

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
  const { username } = useQuery();

  const [peers, setPeers] = useState<PeerState[]>([]);
  const [layout, setLayout] = useState<string>('gallery');
  const [drawerVisible, setDrawerVisible] = useState(true);

  const room = useRoom();

  room.on('change', (pcs: Peer[]) => {
    setPeers([
      {
        ...room.me!,
        isMe: true,
        mediaStream: room.localStream,
        video: room.video,
      },
      ...pcs.map(d => ({
        ...d.peerInfo,
        mediaStream: d.remoteStream,
        pc: d,
        video: d.video,
      })),
    ]);
  });

  useEffect(() => {
    room.join({nickname: username});
  }, []);

  const handleLayoutChange = (type: string) => {
    setLayout(type);
  }

  const handleAction = (key: string) => {
    if (key === 'show-peers') {
      setDrawerVisible(true);
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
              onAction={handleAction}
            />
          </div>
        )}
      </div>
      <Drawer
        className={style.drawer}
        width={320}
        visible={drawerVisible}
        mask={false}
        onClose={() => setDrawerVisible(false)}
      >
        <PeerList peers={peers} />
      </Drawer>
      <Chat />
    </div>
  );
}