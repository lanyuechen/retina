import type { Socket } from 'socket.io-client';
import type Room from './Room';
import type Peer from './Peer';

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
  localStream: MediaStream;
  peerInfo: PeerInfo;
  onChange?: () => void;
}

export interface RoomInitParams {
  roomId: string;
  constraints?: any;
  onChange?: (peers: Peer[]) => void;
}

export interface Message {
  type: 'offer' | 'answer' | 'candidate' | 'message' | 'state';
  id: string;
  description?: any;
  candidate?: any;
  [key: string]: any;
}