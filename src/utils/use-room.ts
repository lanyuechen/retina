import { useMemo } from 'react';
import { useParams } from 'umi';
import Room from '@/webrtc/Room';

export default () => {
  const { id } = useParams<{id: string}>();
  return useMemo(() => Room.getInstance(id), []);
}