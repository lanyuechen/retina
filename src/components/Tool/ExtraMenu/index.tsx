import React from 'react';
import { Menu, message } from 'antd';
import {
  UserOutlined,
  UserDeleteOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon';

interface PropType {
  participant: any;
}

export default (props: PropType) => {
  const service = {};
  const { participant, ...others } = props;
  const { peerId, local, pinned, video } = participant;

  const toggleVideo = () => {
    // if (local) {
    //   if (video) {
    //     service.stopLocalPreview();
    //   } else {
    //     service.startLocalPreview();
    //   }
    // } else {
    //   if (video) {
    //     service.stopRemoteView(peerId);
    //   } else {
    //     message.info('已向该用户发送请求！');
    //   }
    // }
  }

  const togglePin = () => {
    // service.pin(peerId, !pinned);
  }

  return (
    <Menu {...others}>
      <Menu.Item icon={!video ? <Icon type="icon-camera" /> : <Icon type="icon-camera-disabled" className="color-danger" />} onClick={toggleVideo}>
        {video ? '关闭视频' : '开启视频'}
      </Menu.Item>
      <Menu.Item icon={!pinned ? <PushpinOutlined /> : <PushpinOutlined />} onClick={togglePin}>
        {pinned ? '取消固定' : '固定视频'}
      </Menu.Item>
      {!local && (
        <>
          <Menu.Item icon={<UserOutlined />}>
            设为主持人
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            设为联席主持人
          </Menu.Item>
          <Menu.Item icon={<UserDeleteOutlined />} className="color-danger">
            从会议中移除
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
