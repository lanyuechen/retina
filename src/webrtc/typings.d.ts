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
  room: Room;
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
  type: 'offer' | 'answer' | 'candidate' | 'message';
  id: string;
  description?: any;
  candidate?: any;
}