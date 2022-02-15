import type Room from './Room';
import type Peer from './Peer';
import type StreamManager from './StreamManager';

export type {
  Room, Peer
};

export interface PeerBasicInfo {
  nickname: string;
  avatar?: string;
}

export interface PeerInfo extends PeerBasicInfo {
  id: string;
}

export interface PeerInitParams {
  localStream: StreamManager;
  peerInfo: PeerInfo;
  onChange?: () => void;
  onDataChannelMessage?: (message: any) => void;
}

export interface Message {
  type: 'offer' | 'answer' | 'candidate' | 'datachannel' | 'message';
  id: string;
  description?: any;
  candidate?: any;
  [key: string]: any;
}