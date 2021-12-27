import React, { useEffect, useRef, useState, useMemo } from 'react';
import { history } from 'umi';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton,
} from '@mui/material';
import MStream from '@/webrtc/MediaStream';

import { AudioIcon, VideoIcon } from '@/components/SwitchButton';
import VideoCard from '@/components/VideoCard';
import Form, { FormRef } from '@/components/Form';

export default (props: any) => {
  const { visible, onCancel } = props;
  const [me, setMe] = useState<any>({
    nickname: '我',
    isMe: true,
    videoStream: null,
    audioStream: null,
  });
  const form = useRef<FormRef>();

  const stream = useMemo(() => new MStream(), []);

  useEffect(() => {
    stream.init({
      audio: false,
      video: true,
    }).then(() => {
      setMe({
        ...me,
        videoStream: stream.videoStream,
      });
    });

    return () => {
      stream.destroy();
    }
  }, []);

  const joinMeeting = async () => {
    form.current?.submit((values: any) => {
      history.push({
        pathname: `/room/${values.roomId}`,
        query: {
          u: values.username,
          a: me.audioStream ? 'on' : 'off',
          v: me.videoStream ? 'on' : 'off',
        }
      })
    });
  }

  const handleAudio = async () => {
    const audioStream = await stream.toggleAudioStream();
    setMe({
      ...me,
      audioStream,
    });
  }

  const handleVideo = async () => {
    const videoStream = await stream.toggleVideoStream();
    setMe({
      ...me,
      videoStream: videoStream,
    });
  }

  return (
    <Dialog open={visible} onClose={onCancel}>
      <DialogTitle>加入会议</DialogTitle>
      <DialogContent>
        <Form
          ref={form}
          defaultValues={{
            roomId: '',
            username: '',
          }}
          rules={{
            roomId: {required: '房间ID不能为空'}
          }}
        >
          <TextField
            name="roomId"
            label="房间ID"
            variant="standard"
            autoFocus
            fullWidth
          />
          <TextField
            name="username"
            label="用户名"
            margin="normal"
            variant="standard"
            fullWidth
          />
        </Form>
        {me && (
          <VideoCard peer={me} showTag={false} showTool={false} />
        )}
      </DialogContent>
      <DialogActions>
        <div style={{position: 'absolute', left: 8}}>
          <IconButton onClick={handleAudio}>
            <AudioIcon active={Boolean(me.audioStream)} />
          </IconButton>
          <IconButton onClick={handleVideo}>
            <VideoIcon active={Boolean(me.videoStream)} />
          </IconButton>
        </div>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={joinMeeting}>确定</Button>
      </DialogActions>
    </Dialog>
  );
}
