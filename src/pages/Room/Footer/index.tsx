import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Menu, Dropdown, Modal } from 'antd';
import {
  ControlOutlined,
  UserAddOutlined,
  MoreOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon';
import { AudioIcon, VideoIcon } from '@/components/ToggleIcon';
import Btn from './Btn';
import style from './style.less';

interface PropType {
  showParticipants: () => void;
}

export default (props: PropType) => {
  const { showParticipants } = props;

  const menu = (
    <Menu>
      <Menu.Item icon={<Icon type="icon-cc" />}>
        打开字幕
      </Menu.Item>
      <Menu.Item icon={<Icon type="icon-live" />}>
        转播画面
      </Menu.Item>
      <Menu.Item icon={<Icon type="icon-effect" />}>
        特效
      </Menu.Item>
      <Menu.Item icon={<Icon type="icon-setting" />}>
        设置
      </Menu.Item>
    </Menu>
  );

  const leave = () => {
    Modal.confirm({
      title: '提示',
      content: '是否要退出会议？',
      okText: '是',
      cancelText: '否',
    })
  }

  return (
    <div className={style.container}>
      <Btn
        icon={<AudioIcon active={true} />}
        // onClick={me.audio ? service.stopLocalAudio : service.startLocalAudio}
        dropdown={menu}
      >
        麦克风
      </Btn>
      <Btn
        icon={<VideoIcon active={true} />}
        // onClick={me.video ? service.stopLocalPreview : service.startLocalPreview}
        dropdown={menu}
      >
        摄像头
      </Btn>
      <Btn
        icon={<UserAddOutlined />}
        onClick={showParticipants}
      >
        参会人
        <small
          style={{
            position: 'absolute', 
            top: -24, 
            right: 0,
            fontWeight: 'bold'
          }}
        >
          {10}
        </small>
      </Btn>
      <Btn 
        icon={<Icon type="icon-share-screen" style={{color: 'rgb(52, 199, 58)'}} />}
        // onClick={service.openShare}
        // dropdown={menu}
      >
        共享
      </Btn>
      <Btn icon={<Icon type="icon-recording" />}>开始录制</Btn>
      <Dropdown overlay={menu} trigger={['click']}>
        <Btn icon={<MoreOutlined rotate={90} />}>
          更多
        </Btn>
      </Dropdown>
      <Btn 
        icon={<PhoneOutlined className="color-danger" rotate={225} />}
        onClick={leave}
        style={{float: 'right'}}
      >
        离开
      </Btn>
    </div>
  )
}
