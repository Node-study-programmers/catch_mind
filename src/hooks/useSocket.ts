import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, { path: '소켓 연결 경로' }); // 소켓연결
    setSocket(socket);

    socket.on('대기 이벤트', data => {
      //이벤트에 맞는 로직...
    });

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
