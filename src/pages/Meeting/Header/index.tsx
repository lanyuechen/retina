import React, { useMemo, useContext } from 'react';
import { Dropdown, Divider, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DownOutlined, AppstoreOutlined } from '@ant-design/icons';
import Timer from '@/component/Timer';
import { MeetingContext } from '@/pages/Meeting';
import style from './style.module.scss';

export default (props: any) => {
  const { layout, onLayoutChange } = props;
  const { id } = useParams<{id: string}>();
  const { participants } = useContext(MeetingContext);

  const me = participants[0];

  const menuData = useMemo(() => [
    { name: 'gallery', title: '宫格视图' },
    { name: 'thumbnail', title: '缩略图视图' },
    { name: 'speaker', title: '演讲者视图' },
  ], []);

  const menuInfo = (
    <div className={`${style.menu} ${style.info}`}>
      <h3>{me.peerName}</h3>
      <ul>
        <li>
          <label>会议ID</label>
          <span>{id}</span>
        </li>
        <li>
          <label>会议链接</label>
          <span>http://localhost:3000/conf</span>
        </li>
        <li>
          <label>电话拨入</label>
          <span>
            +86 10 8888 8888(中国大陆) <br />
            <a href="javascript:;">更多电话号码</a>
          </span>
        </li>
      </ul>
      <CopyToClipboard
        text={`会议ID: ${id}\n会议链接: http://localhost:3000/conf\n电话拨入: +86 10 8888 8888(中国大陆)`}
        onCopy={() => message.success('复制成功')}
      >
        <Button style={{marginRight: 16}}>复制入会信息</Button>
      </CopyToClipboard>
      <Button>分享至会话</Button>
    </div>
  );

  const menu = (
    <ul className={style.menu}>
      {menuData.map((d: any) => (
        <li
          key={d.name}
          onClick={() => onLayoutChange(d.name)}
          className={layout === d.name ? style.active : undefined}
        >
          <div className={style.icon} data-type={d.name} />
          {d.title}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={style.container}>
      <Dropdown overlay={menuInfo} trigger={['click']}>
        <span className={style.dropdown}>
          ID: {id} <DownOutlined />
        </span>
      </Dropdown>
      <Divider type="vertical" />
      <Timer />

      <Dropdown overlay={menu} trigger={['click']}>
        <span className={style.dropdown} style={{float: 'right'}}>
          <AppstoreOutlined />&nbsp;
          {menuData.find(d => d.name === layout).title} <DownOutlined />
        </span>
      </Dropdown>
    </div>
  )
}
