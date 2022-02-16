import React, { useMemo } from 'react';
import { ImageList, ImageListItem, Box } from '@mui/material';
import VideoCard from '@/components/VideoCard';

import type { PeerInfo } from '@/webrtc/typings';

export default (props: {peers: PeerInfo[]}) => {
  // const { peers } = props;
  const peers = [
    {
      nickname: 'test1',
      id: 1,
      avatar: '1',
      width: 200,
      height: 110,
      bg: '#aaa',
    },
    {
      nickname: 'test2',
      id: 2,
      avatar: '2',
      width: 200,
      height: 300,
      bg: '#bbb',
    },
    {
      nickname: 'test3',
      id: 3,
      avatar: '3',
      width: 200,
      height: 110,
      bg: '#ccc',
    },
    {
      nickname: 'test4',
      id: 4,
      avatar: '4',
      width: 200,
      height: 110,
      bg: '#ddd',
    },
    {
      nickname: 'test5',
      id: 5,
      avatar: '5',
      width: 200,
      height: 110,
      bg: '#aa0',
    },
    {
      nickname: 'test6',
      id: 6,
      avatar: '6',
      width: 200,
      height: 300,
      bg: '#b0b',
    },
    {
      nickname: 'test7',
      id: 7,
      avatar: '7',
      width: 200,
      height: 110,
      bg: '#0cc',
    },
  ]

  const cols = useMemo(() => {
    if (window.innerWidth > window.innerHeight) {
      return Math.ceil(Math.sqrt(peers.length));
    }
    return Math.floor(Math.sqrt(peers.length));
  }, [peers.length]);

  return (
    <Box sx={{width: 616}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {peers.map((d: any, i: number) => (
          <ImageListItem key={i}>
            <div style={{width: d.width, height: d.height, background: d.bg}}>
              {/* <VideoCard peer={d} /> */}
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
