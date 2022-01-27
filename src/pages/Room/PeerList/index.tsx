import { List } from '@mui/material';

import PeerItem from './PeerItem';

export default (props: any) => {
  const { peers } = props;

  return (
    <List>
      {peers.map((d: any, i: number) => (
        <PeerItem key={i} peer={d} />
      ))}
    </List>
  )
}
