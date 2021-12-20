import React, { useState } from 'react';
import { Input, Tabs, List, Empty, Button, Row, Col, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/Icon';

import PeerItem from './PeerItem';

import style from './style.less';

export default (props: any) => {
  const { peers } = props;
  const [ keyword, setKeyword ] = useState('');

  return (
    <div className={style.peerList}>
      <div className={style.search}>
        <Row gutter={8}>
          <Col flex="1 1 100px">
            <Input
              prefix={(
                <SearchOutlined />
              )}
              onChange={e => setKeyword(e.target.value)}
              placeholder="搜索/邀请"
            />
          </Col>
          <Col flex="0 1 40px">
            <Tooltip title="分享">
              <Button icon={<Icon type="icon-share" />} />
            </Tooltip>
          </Col>
        </Row>

      </div>
      <div className={style.tabsContainer}>
        <Tabs>
          <Tabs.TabPane tab={`全部(${peers.length})`} key="1">
            <List itemLayout="horizontal">
              {peers
                .filter((d: any) => !keyword || d.peerName.includes(keyword))
                .map((d: any, i: number) => (
                  <PeerItem key={i} peer={d} />
                )
              )}
            </List>
          </Tabs.TabPane>
          <Tabs.TabPane tab={`建议(0)`} key="2">
            <Empty />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className={style.footer}>
        <Row gutter={8}>
          <Col span={12}>
            <Button block>全员静音</Button>
          </Col>
          <Col span={12}>
            <Button block>取消全员静音</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}
