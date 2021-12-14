import React from 'react';
import {
  AudioOutlined, AudioMutedOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon';

interface PropType {
  active: boolean;
}

export const AudioIcon = ({ active }: PropType) => {
  return active ? <AudioOutlined /> : <AudioMutedOutlined className="color-danger" />;
}

export const VideoIcon = ({ active }: PropType) => {
  return active ? <Icon type="icon-camera" /> : <Icon type="icon-camera-disabled" className="color-danger" />;
}

export const PinIcon = ({ active }: PropType) => {
  return active ? <PushpinOutlined /> : <PushpinOutlined />;
}