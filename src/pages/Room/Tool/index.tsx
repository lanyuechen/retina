import React, { useContext } from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { AudioIcon } from '@/components/ToggleIcon';
import ExtraMenu from './ExtraMenu';
import style from './style.less';

interface PropType {
  className?: string;
  peer: any;
}

export default (props: PropType) => {
  const service = {};
  const { peer, className } = props;

  return (
    <div className={`${style.tool} ${className ? className : ''}`}>
      <Tooltip title="静音">
        <Button
          // onClick={participant.audio ? service.stopLocalAudio : service.startLocalAudio}
          shape="circle"
          icon={<AudioIcon active={peer.audio} />}
        />
      </Tooltip>
    
      <Dropdown
        overlay={<ExtraMenu participant={peer} />}
        trigger={['click']}
      >
        <Button shape="circle" icon={<MoreOutlined rotate={90} />} />
      </Dropdown>
    </div>
  );
};
