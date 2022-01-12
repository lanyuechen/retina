import type Room from './Room';
import type Peer from './Peer';
import type StreamManager from './StreamManager';

export type {
  Room, Peer
};

export interface PeerBasicInfo {
  nickname: string;
}

export interface PeerInfo extends PeerBasicInfo {
  id: string;
  clientId: string;
}

export interface PeerInitParams {
  localStream: StreamManager;
  peerInfo: PeerInfo;
  onChange?: () => void;
}

export interface Message {
  type: 'offer' | 'answer' | 'candidate' | 'datachannel' | 'message';
  id: string;
  description?: any;
  candidate?: any;
  [key: string]: any;
}