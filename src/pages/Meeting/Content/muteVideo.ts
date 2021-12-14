import { ParticipantType } from "../data";

export default function(page: number, size: number, peers: ParticipantType[], pinnedId?: string) {
  if (!window.roomClient) {
    return;
  }
  const res = [];
  for (let i = 0; i < peers.length; i++) {
    const d = peers[i];
    
    if ((i >= page * size && i < (page + 1) * size) || d.peerId === pinnedId) {
      if (d.local) {
        //window.roomClient.muteLocalVideo(false);
      } else {
        window.roomClient.muteRemoteVideo(d.peerId, false);
      }
      res.push(0);
    } else {
      if (d.local) {
        //window.roomClient.muteLocalVideo(true);
      } else {
        console.log("[muteVideo] muteRemoteVideo")
        window.roomClient.muteRemoteVideo(d.peerId, true);
      }
      res.push(1);
    }
  }
  console.log('[log]====', res);
}