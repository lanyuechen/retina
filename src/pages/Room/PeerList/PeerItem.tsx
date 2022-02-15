import React from 'react';
import { ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';
import MAvatar from '@/components/MultiAvatar/Avatar';

import { AudioIcon, VideoIcon } from '@/components/SwitchButton';

export default (props: {peer: any}) => {
  const { peer } = props;

  const secondaryAction = (
    <>
      <IconButton>
        <AudioIcon active={peer.audio} />
      </IconButton>
      <IconButton>
        <VideoIcon active={peer.video} />
      </IconButton>
    </>
  );

  return (
    <ListItem
      disablePadding
      secondaryAction={secondaryAction}
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <MAvatar seed={peer.avatar} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${peer.nickname}${peer.isMe ? '(我)' : ''}`}
          secondary={peer.id}
        />
      </ListItemButton>
    </ListItem>
  );
}