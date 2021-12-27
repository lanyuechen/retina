import React from 'react';
import AspectCard from '@/components/AspectCard';
import VideoCard from '@/components/VideoCard';

export default () => {
  return (
    <div style={{width: 200}}>
      hello world

      <AspectCard width="100px">
        <div
          style={{width: '100%', height: '100%', border: '1px solid #000', boxSizing: 'border-box'}}
        >
          test
        </div>
      </AspectCard>

      <VideoCard
        peer={{nickname: 'test'}}
      />
    </div>
  );
}