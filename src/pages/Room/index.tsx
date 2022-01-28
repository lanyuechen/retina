import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Peer from '@/webrtc/Peer';
import Room from '@/webrtc/Room';

import Chat from '@/components/Chat';
import useQuery from '@/utils/use-query';

import Header from './Header';
import Toolbar from './Toolbar';
import Content from './Content';
import PeerList from './PeerList';
import Layout from './Layout';


import type { PeerState } from './typings';

export default () => {
  const { id } = useParams<{id: string}>();
  const { u: username, v: video, a: audio } = useQuery();
  const navigate = useNavigate();

  const [peers, setPeers] = useState<PeerState[]>([]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [layout, setLayout] = useState<string>('gallery');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const room = useMemo(() => Room.getInstance(id!), []);

  useEffect(() => {
    room.getDevices().then((mediaDevices: MediaDeviceInfo[]) => {
      setDevices(mediaDevices);
    });

    room.join({nickname: username}, { video: video === 'on', audio: audio === 'on' });

    room.on('change', (pcs: Peer[]) => {
      setPeers([
        {
          ...room.me!,
          isMe: true,
          videoStream: room.stream.videoStream,
          audioStream: room.stream.audioStream,
        },
        ...pcs.map(d => ({
          ...d.peerInfo,
          videoStream: d.stream.videoStream,
          audioStream: d.stream.audioStream,
          pc: d,
        })),
      ]);
    });

    return () => {
      room.destroy();
    }
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
    } else if (key === 'share') {
      room.startShare();
    } else if (key === 'recorder') {
      room.toggleRecord();
    } else if (key === 'leave') {
      navigate({ pathname: `/join` });
    }
  }

  return (
    <Layout
      header={<Header layout={layout} onLayoutChange={handleLayoutChange} />}
      toolbar={<Toolbar peers={peers} devices={devices} onAction={handleAction} />}
      drawer={<PeerList peers={peers} />}
      drawerVisible={drawerVisible}
      drawerWidth={320}
      onClose={() => setDrawerVisible(false)}
    >
      <Content layout={layout} peers={peers} />
      <Chat room={room} />
    </Layout>
  );
}