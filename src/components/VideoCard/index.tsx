import React from 'react';
import { Avatar, Chip } from '@mui/material';
import AspectCard from '@/components/AspectCard';
import Video from '@/components/Video';
import Audio from '@/components/Audio';
import Tool from '@/components/Tool';
import { AudioIcon } from '@/components/SwitchButton';
import MAvatar from '@/components/MultiAvatar/Avatar';

import style from './style.module.less';

interface PropType {
  peer: any;
  active?: boolean;
  showTag?: boolean;
  showTool?: boolean;
  cover?: boolean;
  style?: any;
}

export default (props: PropType) => {
  const { peer, showTag = true, showTool = true } = props;

  return (
    <AspectCard style={props.style}>
      <div className={style.videoCard}>
        <Video className={style.video} src={peer.videoStream} />
        <Audio src={peer.audioStream} />

        {!peer.videoStream && (
          <div className={style.icon}>
            <Avatar sx={{ width: 80, height: 80 }}>
              <MAvatar seed={peer.avatar} />
            </Avatar>
          </div>
        )}

        {showTag && (
          <Chip
            size="small"
            className={style.tag}
            label={`${peer.nickname}${peer.isMe ? '(我)' : ''}`}
            avatar={(
              <Avatar sx={{bgcolor: 'transparent'}}>
                <AudioIcon active={Boolean(peer.audioStream)} />
              </Avatar>
            )}
          />
        )}

        {showTool && <Tool className={style.tool} peer={peer} />}
      </div>
    </AspectCard>
  );
};
