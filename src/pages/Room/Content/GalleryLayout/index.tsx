import React from 'react';
import { Stack, Grid } from '@mui/material';
import VideoCard from '@/components/VideoCard';

import type { GalleryLayoutProps } from './typings';

export default (props: GalleryLayoutProps) => {
  const { peers } = props;

  const cols = Math.ceil(Math.sqrt(peers.length));

  return (
    <Stack justifyContent="center" sx={{height: '100%'}}>
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
