import React, { useState } from 'react';
import { Empty } from 'antd';
import { Tabs, Tab, List } from '@mui/material';

import PeerItem from './PeerItem';

export default (props: any) => {
  const { peers } = props;
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div style={{width: 320}}>
      <Tabs
        value={currentTab}
        onChange={(event, idx) => setCurrentTab(idx)}
        variant="fullWidth"
      >
        <Tab value={0} label={`全部(${peers.length})`} />
        <Tab value={1} label={`建议(0)`} />
      </Tabs>
      {currentTab === 0 && (
        <List>
          {peers.map((d: any, i: number) => (
            <PeerItem key={i} peer={d} />
          ))}
        </List>
      )}
      {currentTab === 1 && (
        <Empty />
      )}
    </div>
  )
}
