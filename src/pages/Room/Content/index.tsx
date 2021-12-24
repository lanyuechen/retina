import React from 'react';
import GalleryLayout from './GalleryLayout';
// import ThumbnailLayout from './ThumbnailLayout';
import SpeakerLayout from './SpeakerLayout';

export default (props: any) => {
  const { layout, ...others } = props;

  if (layout === 'speaker') {
    return <SpeakerLayout {...others} />;
  }

  // if (layout === 'thumbnail') {
  //   return <ThumbnailLayout {...others} />;
  // }

  return <GalleryLayout {...others} />;
}
