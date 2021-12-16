import React, { useEffect, useRef, useState } from 'react';

import { Drawer } from 'antd';

import Peer from '@/webrtc/Peer';
import Room from '@/webrtc/Room';

import useQuery from '@/utils/use-query';

import Header from './Header';
import Content from './Content';
import Toolbar from './Toolbar';
import PeerList from './PeerList';
import Chat from '@/components/Chat';

import style from './style.less';

import type { PeerState } from './typings';

export default (props: any) => {
  const { id } = props.match.params;

  const { username } = useQuery();

  const [peers, setPeers] = useState<PeerState[]>([]);
  const [layout, setLayout] = useState<string>('gallery');
  const [drawerVisible, setDrawerVisible] = useState(true);

  const store = useRef<{room?: Room}>({});

  const handleRoomChange = (pcs: Peer[]) => {
    if (store.current.room) {
      setPeers([
        {
          ...store.current.room.me!,
          isMe: true,
          mediaStream: store.current.room.localStream,
        },
        ...pcs.map(d => ({
          ...d.peerInfo,
          mediaStream: d.remoteStream,
        })),
      ]);
    }
  }

  useEffect(() => {
    store.current.room = new Room({
      roomId: id,
      onChange: handleRoomChange,
    });

    store.current.room.join({nickname: username});
  }, []);

  const handleLayoutChange = (type: string) => {
    setLayout(type);
  }

  const handleAction = (key: string) => {
    if (key === 'show-peers') {
      setDrawerVisible(true);
    } else if (key === 'toggle-video') {
      // todo toggle video
      store.current.room?.toggleVideo();
    } else if (key === 'toggle-audio') {
      // todo toggle audio
    } else if (key === 'leave') {
      // todo leave room
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