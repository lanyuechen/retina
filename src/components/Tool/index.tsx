import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MoreOutlined } from '@ant-design/icons';
import { AudioIcon } from '@/components/SwitchButton';
import Popover from '@/components/Popover';

import ExtraMenu from './ExtraMenu';

import style from './style.less';

interface PropType {
  className?: string;
  peer: any;
  onAction?: (key: string) => void;
}

export default (props: PropType) => {
  const { peer, className, onAction = () => {} } = props;

  return (
    <div className={`${style.tool} ${className ? className : ''}`}>
      <Tooltip title="静音">
        <IconButton size="small" onClick={() => onAction('toggle-audio')}>
          <AudioIcon active={peer.audio} />
        </IconButton>
      </Tooltip>
    
      <Popover
        overlay={<ExtraMenu peer={peer} onClick={({ key }: any) => onAction(key)} />}
      >
        <IconButton size="small">
          <MoreOutlined rotate={90} />
        </IconButton>
      </Popover>
    </div>
  );
};
