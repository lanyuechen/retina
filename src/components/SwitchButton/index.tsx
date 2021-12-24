import React from 'react';
import Icon from '@/components/Icon';

interface PropType {
  active: boolean;
}

export const AudioIcon = ({ active }: PropType) => {
  return active ? <Icon type="mic" /> : <Icon type="mic-off" />;
}

export const VideoIcon = ({ active }: PropType) => {
  return active ? <Icon type="camera" /> : <Icon type="camera-off" className="color-danger" />;
}

export const PinIcon = ({ active }: PropType) => {
  return active ? <Icon type="pin" /> : <Icon type="pin" />;
}
