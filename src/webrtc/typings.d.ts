import type { Socket } from 'socket.io-client';
import type Room from './Room';
import type Peer from './Peer';
import type MStream from './MediaStream';

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
  socket: Socket;
  localStream: MStream;
  peerInfo: PeerInfo;
  onChange?: () => void;
}

export interface Message {
  type: 'offer' | 'answer' | 'candidate' | 'datachannel' | 'message' | 'state';
  id: string;
  description?: any;
  candidate?: any;
  [key: string]: any;
}