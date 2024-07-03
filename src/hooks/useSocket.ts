import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { userStore } from "../store/userStore";
import { DrawPosition, GameStatus, RoomUser } from "../types";
import screenfull from "screenfull";

export type currentRoomInfoType = {
  nickname: string;
  question: string;
  roomStatus: GameStatus;
};

export type chatMessageType = {
  nickname: string;
  isAnswer: boolean;
  message: string;
};

export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [open, setOpen] = useState(false); // 소켓 에러 시 메시지 띄워줌
  const [errMessage, setErrMessage] = useState(""); // 에러 메시지 상태
  const email = userStore(state => state.user.email);
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null); // 카운트다운 상태 추가
  const [currentRoomInfo, setCurrentRoomInfo] = useState<currentRoomInfoType>();
  const [stageTimer, setStageTimer] = useState<number | null>(null);
  const [drawPosition, setDrawPosition] = useState<DrawPosition>();
  const [chatMessages, setChatMessages] = useState<chatMessageType[]>([]);

  // 에러 알럿창 닫기
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, {
      path: "/socket.io",
      query: { email },
    }); // 소켓 연결
    setSocket(socket);

    socket.on("error", message => {
      setOpen(true); // 소켓 에러 시 메시지 띄우기
      setErrMessage(message);
    });

    socket.on("nextTurn", (data: { nickname: string; question: string }) => {
      setCurrentRoomInfo({
        nickname: data.nickname,
        question: data.question,
        roomStatus: "playing",
      });
    });

    socket.emit("joinRoom", roomId);

    socket.on("updateRoom", (data: RoomUser[]) => {
      console.log("유저들 입퇴장", data);
      setUsers(data); // 유저 입퇴장
    });
    socket.on("gameStart", data => {
      setCurrentRoomInfo(data);
    });

    socket.on("sendMessage", data => {
      // 채팅 메시지

      setChatMessages(prev => [...prev, data]);
    });

    socket.on("nextTurn", (data: { nickname: string; question: string }) => {
      setCurrentRoomInfo({
        nickname: data.nickname,
        question: data.question,
        roomStatus: "playing",
      });
      setChatMessages([]);
    });

    socket.on("draw", data => {
      setDrawPosition({ x: data.x, y: data.y, stopDraw: data.stopDraw });
    });

    return () => {
      socket.emit("leaveRoom", roomId); // 커스텀 훅 사라질 때 방 나감
      socket.disconnect(); // 커스텀 훅 사라질 때 소켓 연결 끊음
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (countdown !== null) {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else {
        socket?.emit("gameStart", roomId);
        setCountdown(null);
      }
    }

    return () => clearTimeout(timer);
  }, [countdown, socket, roomId]);

  // 유저가 브라우저를 강제 종료 시
  useEffect(() => {
    const handleBeforeUnload = () => {
      socket?.emit("leaveRoom", roomId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, roomId]);

  //게임 타이머
  useEffect(() => {
    let clear: number;
    if (currentRoomInfo && currentRoomInfo?.roomStatus !== "waiting") {
      let count = 60;
      setStageTimer(count);
      clear = setInterval(() => {
        count -= 1;
        setStageTimer(count);

        if (count <= 0) {
          nextTurn();
          clearInterval(clear);
          setStageTimer(null);
        }
      }, 1000);
    }

    return () => clearInterval(clear);
  }, [socket, currentRoomInfo]);

  // 채팅 보내는 이벤트
  const submitChat = (data: { chatMessage: string; roomId?: string; isAnswer: boolean }) => {
    if (data.isAnswer) {
      socket?.emit("sendMessage", data);
      setTimeout(() => {
        nextTurn();
      }, 2000);
    }

    socket?.emit("sendMessage", data);
  };

  const gameStart = () => {
    // 개발 시에는 2명 이상, 릴리즈 시에는 3명 이상으로 변경 요망
    if (users.length >= 2) {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
      setCountdown(3);
    } else {
      setOpen(true);
      setErrMessage("3명 이상 시작 가능합니다");
    }
  };
  const nextTurn = () => {
    socket?.emit("nextTurn", { roomId, nickname: currentRoomInfo?.nickname });
  };

  const emitDraw = (x: number, y: number, stopDraw: boolean) => {
    socket?.emit("draw", { roomId, x, y, stopDraw });
  };

  return {
    submitChat,
    handleClose,
    gameStart,
    emitDraw,
    setDrawPosition,
    drawPosition,
    users,
    open,
    errMessage,
    countdown,
    currentRoomInfo,
    stageTimer,
    chatMessages,
    nextTurn,
  };
};
