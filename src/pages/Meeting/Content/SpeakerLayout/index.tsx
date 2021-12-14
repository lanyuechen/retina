import React, { useContext, useEffect } from 'react';
import VideoCard from '../VideoCard';
import { MeetingContext } from '@/pages/Meeting';
import style from './style.module.scss';

export default () => {
  const { participants } = useContext(MeetingContext);

  const mainParticipant = participants.find(d => d.share) ||
    participants.find(d => d.active) ||
    participants[1] ||
    participants[0];

  useEffect(() => {
    if (window.roomClient) {
      const res: number[] = [];
      participants.forEach((d, i) => {
        if (d.local) { // 显示自己的视频
          //window.roomClient.muteLocalVideo(false);
          res.push(0);
        } else if (d.share) { // 显示分享的视频
          // todo
        } else if (i === 1) { // 如果没有分享显示除我外的第一个人
          res.push(0);
          window.roomClient.muteRemoteVideo(participants[1].peerId, false);
        } else {  // 其余所有人的视频都暂停
          res.push(1);
          window.roomClient.muteRemoteVideo(d.peerId, true);
        }
      });
      console.log('[log]====', res);
    }
  }, [participants]);
  
  return (
    <>
      <div className={style.main}>
        <VideoCard participant={mainParticipant} cover showTool={false} />
      </div>
      <div className={style.sub}>
        <VideoCard participant={participants[0]} />
      </div>
    </>
  )
}
