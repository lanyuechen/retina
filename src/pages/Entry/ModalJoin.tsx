import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Form, Input, Modal, Button } from 'antd';
import Btn from '@/components/Btn';
import { AudioIcon, VideoIcon } from '@/components/SwitchButton';
import VideoCard from '@/components/VideoCard';

function randomString() {
  return Math.random() * 1000000 >> 0;
}

export default (props: any) => {
  const { visible, onCancel } = props;
  const [form] = Form.useForm();
  const [me, setMe] = useState<any>();
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(true);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      audio,
      video,
    }).then(mediaStream => {
      setMe({
        nickname: 'myself',
        isMe: true,
        mediaStream
      });
    });
  }, []);

  const newMeeting = async () => {
    const values = await form.validateFields();
    history.push({
      pathname: `/room/${values.roomId || randomString()}`,
      query: {
        username: values.username,
        audio: audio ? 'on' : 'off',
        video: video ? 'on' : 'off',
      }
    })
  }

  const footer = (
    <>
      <Btn
        style={{float: 'left'}}
        icon={<AudioIcon active={audio} />}
        onClick={() => setAudio(!audio)}
      >
        麦克风
      </Btn>
      <Btn
        style={{float: 'left'}}
        icon={<VideoIcon active={video} />}
        onClick={() => setVideo(!video)}
      >
        摄像头
      </Btn>
      <Button onClick={onCancel}>取消</Button>
      <Button type="primary" onClick={newMeeting}>新会议</Button>
    </>
  );

  return (
    <Modal
      title="新会议"
      visible={visible}
      onCancel={onCancel}
      footer={footer}
    >
      <Form form={form}>
        <Form.Item name="roomId" label="房间ID">
          <Input placeholder="请输入房间ID" />
        </Form.Item>
        <Form.Item name="username" label="用户名" rules={[{required: true}]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
      </Form>
      
      {me && (
        <VideoCard peer={me} showTag={false} showTool={false} />
      )}
    </Modal>
  )
}
