import React, { useMemo } from 'react';
import { Stack, Grid } from '@mui/material';
import VideoCard from '@/components/VideoCard';

import type { PeerInfo } from '@/webrtc/typings';

export default (props: {peers: PeerInfo[]}) => {
  const { peers } = props;

  const cols = useMemo(() => {
    if (window.innerWidth > window.innerHeight) {
      return Math.ceil(Math.sqrt(peers.length));
    }
    return Math.floor(Math.sqrt(peers.length));
  }, [peers.length]);

  return (
    <Stack justifyContent="center" sx={{minHeight: '100%'}}>
      <Grid container alignItems="center" spacing={2}>
        {peers.map((d: any, i: number) => (
          <Grid item key={i} xs={12 / cols}>
            <VideoCard peer={d} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
