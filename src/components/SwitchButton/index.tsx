import React from 'react';
import Icon from '@/components/Icon';

interface PropType {
  active: boolean;
}

export const AudioIcon = ({ active }: PropType) => {
  return <Icon type={active ? 'mic' : 'mic-off'} danger={!active} />
}

export const VideoIcon = ({ active }: PropType) => {
  return <Icon type={active ? 'camera' : 'camera-off'} danger={!active} />
}

export const PinIcon = ({ active }: PropType) => {
  return <Icon type={active ? 'pin' : 'pin'} />
}
