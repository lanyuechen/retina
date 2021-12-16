import React from 'react';
import { Menu, Dropdown, Modal } from 'antd';
import {
  UserAddOutlined,
  MoreOutlined,
  PhoneOutlined,
  AudioOutlined, AudioMutedOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon';
import Btn from '@/components/Btn';
import style from './style.less';

interface PropType {
  peers: any[];
  onAction: (key: string) => void;
}

export default (props: PropType) => {
  const { peers, onAction } = props;
  const me = peers[0];

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
      onOk: () => {
        onAction('leave');
      }
    })
  }

  return (
    <div className={style.footer}>
      <Btn
        icon={me.audio ? <AudioOutlined /> : <AudioMutedOutlined className="color-danger" />}
        onClick={() => onAction('toggle-audio')}
        dropdown={menu}
      >
        麦克风
      </Btn>
      <Btn
        icon={me.video ? <Icon type="icon-camera" /> : <Icon type="icon-camera-disabled" className="color-danger" />}
        onClick={() => onAction('toggle-video')}
        dropdown={menu}
      >
        摄像头
      </Btn>
      <Btn
        icon={<UserAddOutlined />}
        onClick={() => onAction('show-peers')}
        badge={peers.length}
      >
        参会人
      </Btn>
      <Btn 
        icon={<Icon type="icon-share-screen" style={{color: 'rgb(52, 199, 58)'}} />}
        onClick={() => onAction('share')}
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
