import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { userStore } from '../store/userStore';

export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const email = userStore(state => state.user.email);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, { path: '/socket.io', query: { email } }); // 소켓연결
    setSocket(socket);

    socket.on('error', message => {
      //이벤트에 맞는 로직...
    });

    socket.emit('joinRoom', roomId);

    return () => {
      socket.disconnect(); //커스텀 훅 사라질때 소켓 연결 끊음
    };
  }, []);

  //채팅 보내는 이벤트
  const submitChat = (data: any) => {
    socket?.emit('chat', data);
  };

  return { submitChat };
};
