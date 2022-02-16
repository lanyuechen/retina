import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { AudioIcon } from '@/components/SwitchButton';
import Popover from '@/components/Popover';
import Icon from '@/components/Icon';

import ExtraMenu from './ExtraMenu';

interface PropType {
  peer: any;
  onAction?: (key: string) => void;
  style?: any;
}

export default (props: PropType) => {
  const { peer, onAction = () => {}, ...others } = props;

  return (
    <div {...others}>
      <Tooltip title={peer.audioStream ? '静音' : '打开声音'}>
        <IconButton size="small" sx={{mt: 1, mr: 1}} onClick={() => onAction('toggle-audio')}>
          <AudioIcon active={peer.audioStream} />
        </IconButton>
      </Tooltip>
    
      <Popover
        overlay={<ExtraMenu peer={peer} onClick={({ key }: any) => onAction(key)} />}
      >
        <IconButton size="small" sx={{mt: 1, mr: 1}}>
          <Icon type="more" rotate={90} />
        </IconButton>
      </Popover>
    </div>
  );
};
