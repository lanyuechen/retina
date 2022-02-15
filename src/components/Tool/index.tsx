import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { AudioIcon } from '@/components/SwitchButton';
import Popover from '@/components/Popover';
import Icon from '@/components/Icon';

import ExtraMenu from './ExtraMenu';

import style from './style.module.less';

interface PropType {
  className?: string;
  peer: any;
  onAction?: (key: string) => void;
}

export default (props: PropType) => {
  const { peer, className, onAction = () => {} } = props;

  return (
    <div className={`${style.tool} ${className ? className : ''}`}>
      <Tooltip title={peer.audioStream ? '静音' : '打开声音'}>
        <IconButton size="small" onClick={() => onAction('toggle-audio')}>
          <AudioIcon active={peer.audioStream} />
        </IconButton>
      </Tooltip>
    
      <Popover
        overlay={<ExtraMenu peer={peer} onClick={({ key }: any) => onAction(key)} />}
      >
        <IconButton size="small">
          <Icon type="more" rotate={90} />
        </IconButton>
      </Popover>
    </div>
  );
};
