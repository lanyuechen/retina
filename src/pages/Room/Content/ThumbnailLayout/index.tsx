import React, { useState, useMemo } from 'react';
import { Stack, Box, MobileStepper, IconButton } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import VideoCard from '@/components/VideoCard';
import ResizeObserverView from '@/components/ResizeObserverView';
import Icon from '@/components/Icon';

import type { PeerInfo } from '@/webrtc/typings';

const THUMBNAIL_WIDTH = 200;
const THUMBNAIL_HEIGHT = 110;

export default (props: {peers: PeerInfo[]}) => {
  const { peers } = props;

  const activePeer = peers[0];

  const [activeStep, setActiveStep] = useState(0);
  const [width, setWidth] = useState(0);

  const peerPagination = useMemo(() => {
    if (!width) {
      return [];
    }
    const n = Math.floor(width / (THUMBNAIL_WIDTH + 16));
    const res = [];
    for (let i = 0; i < peers.length; i += n) {
      res.push(peers.slice(i, i + n));
    }
    return res;
  }, [peers, width]);

  const handleNext = () => {
    setActiveStep((step: number) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step: number) => step - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Stack sx={{height: '100%'}}>
      <ResizeObserverView onResize={(rect: any) => setWidth(rect.width)}>
        <SwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {peerPagination.map((peers: PeerInfo[], i: number) => (
            <Stack key={i} direction="row" justifyContent="center" spacing="16px">
              {peers.map((d, index) => (
                <div key={index} style={{width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT}}>
                  <VideoCard peer={d} />
                </div>
              ))}
            </Stack>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={peerPagination.length}
          position="static"
          activeStep={activeStep}
          sx={{
            height: 10,
            '& .MuiIconButton-root': {
              position: 'relative',
              top: -65,
            }
          }}
          nextButton={
            <IconButton
              onClick={handleNext}
              disabled={activeStep === peerPagination.length - 1}
            >
              <Icon type="right" />
            </IconButton>
          }
          backButton={
            <IconButton
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <Icon type="left" />
            </IconButton>
          }
        />
      </ResizeObserverView>

      <Box sx={{flexGrow: 1}}>
        <VideoCard peer={activePeer} />
      </Box>
    </Stack>
  );
};
