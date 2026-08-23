import type { SocketEvent } from '@/common/constants';
import { getSocket } from '@/common/socket/getSocket.ts';

export const subscribeToEvent = <T>(event: SocketEvent, callback: (data: T) => void) => {
  const socket = getSocket();

  socket.on(event, callback);
  return () => socket.off(event, callback);
};
