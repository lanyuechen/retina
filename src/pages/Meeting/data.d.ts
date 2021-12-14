// type Dispatch<A> = (value: A) => void;
// type SetStateAction<S> = S | ((prevState: S) => S);
export type CALLBACK = (peers: ParticipantType[]) => ParticipantType[];

export interface ServiceType {
  openShare: () => void;              // 桌面共享
  stopLocalPreview: () => void;       // 关闭本地视频
  startLocalPreview: () => void;      // 打开本地视频
  stopRemoteView: (userId: string) => void;   // 关闭远端视频

  muteLocalVideo: () => void;         // 暂停本地视频
  unMuteLocalVideo: () => void;       // 恢复本地视频
  stopLocalAudio: () => void;         // 关闭本地音频
  startLocalAudio: () => void;        // 打开本地音频
  muteLocalAudio: (mute: boolean) => void;         // 静音/恢复
  muteAllRemoteAudios: () => void;    // 暂停所有音频
  unMuteAllRemoteAudios: () => void;  // 恢复所有音频
  muteAllRemoteViews: () => void;     // 暂停所有视频
  unMuteAllRemoteViews: () => void;   // 恢复所有视频
  pin: (userId: string, pinned: boolean) => void; // 固定/取消固定视频
  setParticipants: (cb: CALLBACK) => void; // 设置参会人状态
  close: () => void;                  // 关闭
}

export interface ParticipantType {
  peerId: string;
  peerName: string;
  local?: boolean;
  audio?: boolean;
  video?: boolean;
  share?: boolean;
  pinned?: boolean;
  active?: boolean;
}

export interface RtcType {
  participants: ParticipantType[];
  service: ServiceType;
}