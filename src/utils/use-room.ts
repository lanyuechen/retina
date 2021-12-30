import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Room from '@/webrtc/Room';

export default () => {
  const { id } = useParams<{id: string}>();
  return useMemo(() => Room.getInstance(id!), []);
}