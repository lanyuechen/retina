import React, { useState, createContext } from 'react';
import { Drawer } from 'antd';
import { useParams } from 'react-router-dom';
import useRtc from '@/hooks/use-rtc';
import useQuery from '@/hooks/use-query';
import Participants from './Participants';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Chat from '@/component/Chat';
import { RtcType } from './data';
import style from './style.module.scss';

export const MeetingContext = createContext<RtcType>(null);

export default () => {
  const { id } = useParams<{id: string}>();
  const { serveraddr, username, audio, video } = useQuery();
  const [ layout, setLayout ] = useState('gallery');
  const [ drawerVisible, setDrawerVisible ] = useState(true);

  const { participants, service } = useRtc({
    server: serveraddr,
    roomId: id,
    username,
    audio: audio === 'open',
    video: video === 'open',
  });

  const handleLayoutChange = (type: string) => {
    if (type !== 'thumbnail') {
      service.pin('', false);
    }
    setLayout(type);
  }

  const realLayout = participants.find(d => d.pinned) ? 'thumbnail' : layout;

  return (
    <MeetingContext.Provider value={{ participants, service }}>
      <div className={style.container}>
        <div className={style.left} style={{paddingRight: drawerVisible ? 320 : 0}}>
          <div className={style.header}>
            <Header layout={realLayout} onLayoutChange={handleLayoutChange} />
          </div>
          <div className={style.content}>
            <Content layout={realLayout} />
          </div>
          <div className={style.footer}>
            <Footer
              showParticipants={() => setDrawerVisible(true)}
            />
          </div>
        </div>
        <Drawer
          className={style.drawer}
          width={320}
          visible={drawerVisible}
          mask={false}
          onClose={() => setDrawerVisible(false)}
        >
          <Participants />
        </Drawer>
        <Chat />
      </div>
    </MeetingContext.Provider>
  )
}
