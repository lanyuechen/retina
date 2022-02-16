import React from 'react';
import GalleryLayout from './GalleryLayout';
import StackLayout from './StackLayout';
import SpeakerLayout from './SpeakerLayout';

export default (props: any) => {
  const { layout, ...others } = props;

  if (layout === 'speaker') {
    return <SpeakerLayout {...others} />;
  }

  if (layout === 'stack') {
    return <StackLayout {...others} />;
  }

  return <GalleryLayout {...others} />;
}
