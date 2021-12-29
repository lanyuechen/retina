import React from 'react';
import { Avatar, Chip } from '@mui/material';
import AspectCard from '@/components/AspectCard';
import Video from '@/components/Video';
import Audio from '@/components/Audio';
import Tool from '@/components/Tool';
import { AudioIcon } from '@/components/SwitchButton';

import style from './style.less';

interface PropType {
  peer: any;
  active?: boolean;
  showTag?: boolean;
  showTool?: boolean;
  cover?: boolean;
}

export default (props: PropType) => {
  const { peer, showTag = true, showTool = true } = props;

  return (
    <AspectCard>
      <div className={style.videoCard}>
        <Video className={style.video} src={peer.videoStream} />
        <Audio src={peer.audioStream} />

        {!peer.videoStream && (
          <div className={style.icon}>
            <Avatar>
              {peer.nickname?.[0]}
            </Avatar>
          </div>
        )}

        {showTag && (
          <Chip
            size="small"
            className={style.tag}
            icon={<AudioIcon active={Boolean(peer.audioStream)} />}
            label={`${peer.nickname}${peer.isMe ? '(我)' : ''}`}
          />
        )}

        {showTool && <Tool className={style.tool} peer={peer} />}
      </div>
    </AspectCard>
  );
};
