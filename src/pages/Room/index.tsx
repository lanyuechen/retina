import React, { useEffect, useRef, useState } from 'react';

import { Drawer } from 'antd';

import Peer from '@/webrtc/Peer';
import Room from '@/webrtc/Room';

import useQuery from '@/utils/use-query';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Participants from './Participants';
import Chat from '@/components/Chat';

import style from './style.less';

export default (props: any) => {
  const { id } = props.match.params;

  const store = useRef<any>({});
  const ref = useRef<HTMLVideoElement>(null);
  const [peers, setPeers] = useState<any[]>([]);

  console.log('=====', peers);

  const { username } = useQuery();
  const [ layout, setLayout ] = useState('gallery');
  const [ drawerVisible, setDrawerVisible ] = useState(true);

  const handlePeerChange = (pcs: Peer[]) => {
    setPeers([
      {
        ...store.current.room.me,
        isMe: true,
        mediaStream: store.current.room.localStream,
      },
      ...pcs.map(d => ({
        ...d.peerInfo,
        mediaStream: d.remoteStream,
      })),
    ]);
  }

  useEffect(() => {
    store.current.room = new Room({
      roomId: id,
      localVideo: ref.current,
      onPeerChange: handlePeerChange,
    });

    store.current.room.join({nickname: username});
  }, []);

  const handleLayoutChange = (type: string) => {
    if (type !== 'thumbnail') {
      // service.pin('', false);
    }
    setLayout(type);
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
        <div className={style.footer}>
          <Footer showParticipants={() => setDrawerVisible(true)} />
        </div>
      </div>
      <Drawer
        className={style.drawer}
        width={320}
        visible={drawerVisible}
        mask={false}
        onClose={() => setDrawerVisible(false)}
      >
        <Participants peers={peers} />
      </Drawer>
      <Chat />
    </div>
  );
}