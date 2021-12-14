import React, { useContext, useEffect } from 'react';
import VideoCard from '../VideoCard';
import style from './style.less';

export default (props: any) => {
  const { peers } = props;
  const mainPeer = peers[1];
  
  return (
    <>
      {mainPeer && (
        <div className={style.main}>
          <VideoCard peer={mainPeer} cover showTool={false} />
        </div>
      )}
      <div className={style.sub}>
        <VideoCard peer={peers[0]} />
      </div>
    </>
  )
}
