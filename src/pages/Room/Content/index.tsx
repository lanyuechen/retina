import React from 'react';
import GalleryLayout from './GalleryLayout';
import ThumbnailLayout from './ThumbnailLayout';
import SpeakerLayout from './SpeakerLayout';

export default (props: any) => {
  const { layout, peers, ...others } = props;

  if (!peers || !peers.length) {
    return null;
  }

  if (layout === 'speaker') {
    return <SpeakerLayout peers={peers} {...others} />;
  }

  if (layout === 'thumbnail') {
    return <ThumbnailLayout peers={peers} {...others} />;
  }

  return <GalleryLayout peers={peers} {...others} />;
}
