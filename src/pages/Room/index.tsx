import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Drawer, Divider, IconButton, Typography, Stack } from '@mui/material';

import Peer from '@/webrtc/Peer';
import Room from '@/webrtc/Room';

import Chat from '@/components/Chat';
import Icon from '@/components/Icon';
import useQuery from '@/utils/use-query';

import Header from './Header';
import Content from './Content';
import Toolbar from './Toolbar';
import PeerList from './PeerList';

import style from './style.module.less';

import type { PeerState } from './typings';

export default () => {
  const { id } = useParams<{id: string}>();
  const { u: username, v: video, a: audio } = useQuery();

  const [peers, setPeers] = useState<PeerState[]>([]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [layout, setLayout] = useState<string>('gallery');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const room = useMemo(() => Room.getInstance(id!), []);

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
          videoStream: room.localStream.shareStream || room.localStream.videoStream,
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
      room.toggleShare();
    } else if (key === 'recorder') {
      room.record();
    } else if (key === 'leave') {
      room.hangup();
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
        <div className={style.footer}>
          <Toolbar
            peers={peers}
            devices={devices}
            onAction={handleAction}
          />
        </div>
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
        <Stack direction="row" alignItems="center">
          <IconButton onClick={() => setDrawerVisible(false)}>
            <Icon type="left" />
          </IconButton>
          <Typography variant="h6">
            参会人
          </Typography>
        </Stack>
        <Divider />
        <PeerList peers={peers} />
      </Drawer>
      <Chat room={room} />
    </div>
  );
}