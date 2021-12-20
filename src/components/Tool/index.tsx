import React from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

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
        <Button
          onClick={() => onAction('toggle-audio')}
          shape="circle"
          icon={peer.audio ? <AudioOutlined /> : <AudioMutedOutlined className="color-danger" />}
        />
      </Tooltip>
    
      <Dropdown
        overlay={<ExtraMenu peer={peer} onClick={({ key }: any) => onAction(key)} />}
        trigger={['click']}
      >
        <Button shape="circle" icon={<MoreOutlined rotate={90} />} />
      </Dropdown>
    </div>
  );
};
