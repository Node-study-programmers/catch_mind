import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { userStore } from '../store/userStore';
import { GameStatus, RoomUser } from '../types';

export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [open, setOpen] = useState(false); //소켓 에러시 메세지 띄워줌
  const [errMessage, setErrMessage] = useState(''); //에러 메세지 상태
  const email = userStore(state => state.user.email);
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');

  //에러 알럿창 닫기
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, { path: '/socket.io', query: { email } }); // 소켓연결
    setSocket(socket);

    socket.on('error', message => {
      setOpen(true); //소켓 에러있을시 메세지 띄우기
      setErrMessage(message);
    });

    socket.emit('joinRoom', roomId);

    socket.on('updateRoom', (data: RoomUser[]) => {
      setUsers(data); //유저 들어왔다 나갔다
    });

    socket.on('sendMessage', data => {
      //채팅 메세지
      console.log('메세지', data);
    });

    socket.on('roomStatus', status => {
      setGameStatus(status);
    });

    return () => {
      socket.emit('leaveRoom', roomId); //커스텀 훅 사라질때 방 나가짐
      socket.disconnect(); //커스텀 훅 사라질때 소켓 연결 끊음
    };
  }, []);

  //유저가 브라우저를 강제 종료시
  window.addEventListener('beforeunload', () => {
    socket?.emit('leaveRoom', roomId);
  });

  //채팅 보내는 이벤트
  const submitChat = (data: { chatMessage: string; roomId: string; isAnswer: boolean }) => {
    socket?.emit('sendMessage', data);
  };

  const gameStart = () => {
    //개발시에만 2명 이상 릴리즈는 3명 이상으로 변경 요망
    if (users.length >= 2) {
      return socket?.emit('gameStart', roomId);
    }
    setOpen(true);
    setErrMessage('3명 이상 시작 가능합니다');
  };

  return { submitChat, handleClose, gameStart, users, open, errMessage, gameStatus };
};
