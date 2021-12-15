import type { PeerInfo } from '@/webrtc/typings';

export interface PeerState extends PeerInfo {
  mediaStream?: MediaStream;
  isMe?: boolean;
}

