/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useContext } from 'react';
import { ParticipantType } from '@/pages/Meeting/data';
import { MeetingContext } from '@/pages/Meeting';
import style from './style.module.scss';

export default (props: { participant: ParticipantType }) => {
  const { peerId, video, audio, local, share } = props.participant;
  const { service } = useContext(MeetingContext);

  const videoRef = useRef<HTMLVideoElement>();
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (window.roomClient) {
      if (share) {
        const pid = peerId.replace('share_', '');
        if (video) {
          window.roomClient.startRemoteShare(pid, videoRef.current);
        } else {
          //window.roomClient.stopRemoteShare(pid);
        }
      } else if (local) {
        if (video) {
          console.log("[VideoView] local video on")
          window.roomClient.startLocalPreview(videoRef.current);
        } else {
          console.log("[VideoView] local video off")
          window.roomClient.stopLocalPreview();
          videoRef.current.srcObject = null;
        }
      } else {
        if (video) {
          console.log("[VideoView] remote video on")
          window.roomClient.startRemoteVideo(peerId, videoRef.current);
        } else {
          console.log("[VideoView] remote video off")
          window.roomClient.muteRemoteVideo(peerId,true);
          videoRef.current.srcObject = null;
        }
      }
    }
  }, [video, peerId]);

  useEffect(() => {
    if (window.roomClient) {
      if (local) {
        console.log(`[VideoView] local audio ${audio?"on":"off"} `)
        window.roomClient.muteLocalAudio(!audio);
      } else {
        if (audio) {
          console.log("[VideoView] remote audio on")
          window.roomClient.startRemoteAudio(peerId, audioRef.current);
        } else {
          console.log("[VideoView] remote audio off")
          window.roomClient.muteRemoteAudio(peerId, true);
          audioRef.current.srcObject = null;
        }
      }
    }
  }, [audio, peerId]);

  return (
    <>
      <video
        className={style.video}
        ref={videoRef}
        style={{opacity: video ? 1 : 0}}
        controls={false}
        autoPlay
        muted
        onDoubleClick={() => service.pin(peerId, true)}
      />
      <audio ref={audioRef} autoPlay muted={false} controls={false} />
    </>
  );
}
