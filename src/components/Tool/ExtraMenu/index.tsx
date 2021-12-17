import React from 'react';
import { Menu, message } from 'antd';
import {
  UserOutlined,
  UserDeleteOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon';

interface PropType {
  peer: any;
  [key: string]: any;
}

export default (props: PropType) => {
  const service = {};
  const { peer, ...others } = props;
  const { peerId, local, pinned, video } = peer;

  return (
    <Menu {...others}>
      <Menu.Item key="toggle-video" icon={!video ? <Icon type="icon-camera" /> : <Icon type="icon-camera-disabled" className="color-danger" />}>
        {video ? '关闭视频' : '开启视频'}
      </Menu.Item>
      <Menu.Item key="toggle-pin" icon={!pinned ? <PushpinOutlined /> : <PushpinOutlined />}>
        {pinned ? '取消固定' : '固定视频'}
      </Menu.Item>
      {!local && (
        <>
          <Menu.Item key="set-host" icon={<UserOutlined />}>
            设为主持人
          </Menu.Item>
          <Menu.Item key="set-uion-host" icon={<UserOutlined />}>
            设为联席主持人
          </Menu.Item>
          <Menu.Item key="remove" icon={<UserDeleteOutlined />} className="color-danger">
            从会议中移除
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
