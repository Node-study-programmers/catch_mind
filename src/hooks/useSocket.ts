import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { userStore } from "../store/userStore";
import { DrawPosition, GameStatus, RoomUser } from "../types";
import { roomStore } from "../store/roomStore";

export type currentRoomInfoType = {
  nickname: string;
  question: string | null;
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
  const { setRoom } = roomStore(state => state);
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null); // 카운트다운 상태 추가
  const [currentRoomInfo, setCurrentRoomInfo] = useState<currentRoomInfoType>();
  const [stageTimer, setStageTimer] = useState<number | null>(null);
  const [drawPosition, setDrawPosition] = useState<DrawPosition>();

  const [chatMessages, setChatMessages] = useState<chatMessageType | null>();
  const [gameResult, setGameResult] = useState<RoomUser[]>();
  const [answerUser, setAnswerUser] = useState<chatMessageType | null>(null);
  const [stageModalOpen, setStageModalOpen] = useState(false);

  // 에러 알럿창 닫기
  const handleClose = () => {
    setOpen(false);
  };

  const nextTurn = (newUsers?: RoomUser[]) => {
    const isGameFinished = newUsers?.some(userEl => userEl.score === 3);

    if (isGameFinished) {
      const updatedUsers = newUsers?.map(user => {
        return { ...user, score: user.score };
      });
      setGameResult(updatedUsers);
      socket?.emit("finishGame", { roomId: roomId, users: updatedUsers });
    } else {
      socket?.emit("nextTurn", { roomId, nickname: currentRoomInfo?.nickname });
    }
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, {
      path: "/socket.io",
      query: { email },
    }); // 소켓 연결
    setSocket(socket);
    socket.emit("joinRoom", roomId);

    socket.on("draw", data => {
      setDrawPosition({
        x: data.x,
        y: data.y,
        stopDraw: data.stopDraw,
        color: data.color,
        erase: data.erase,
      });
    });

    socket.on("countdown", count => {
      setCountdown(count);
    });

    return () => {
      socket.emit("leaveRoom", roomId, () => {
        socket.disconnect();
      });
    };
  }, []);

  useEffect(() => {
    socket?.on("error", message => {
      setOpen(true); // 소켓 에러 시 메시지 띄우기
      setErrMessage(message);
    });

    socket?.on("updateRoom", (data: RoomUser[]) => {
      setUsers(data);
      setUsers(prevUsers => prevUsers.map(userEl => ({ ...userEl, score: 0 })));
    });
    socket?.on("nextTurn", (data: { nickname: string; question: string }) => {
      setCurrentRoomInfo({
        nickname: data.nickname,
        question: data.question,
        roomStatus: "playing",
      });
      setChatMessages(null);
    });

    const handleSendMessage = (data: chatMessageType) => {
      // 채팅 메시지
      if (data.isAnswer) {
        setAnswerUser(data); //정답 맞춘 사용자 상태 저장
        setStageModalOpen(true);
        const newUsers = users.map(user => {
          if (data.nickname === user.nickname) {
            return { ...user, score: user.score + 1 };
          }
          return user;
        });

        setUsers(newUsers);

        setTimeout(() => {
          setAnswerUser(null); //2초후 정답 맞춘 유저 상태 null값으로 변경
          setStageModalOpen(false); //2초후 모달 닫기
          nextTurn(newUsers);
        }, 3000);
      }

      setChatMessages(data);
    };
    socket?.on("sendMessage", handleSendMessage);

    socket?.on("finishGame", ({ roomStatus, masterNickname }) => {
      setCurrentRoomInfo(prevInfo => ({
        ...prevInfo,
        nickname: masterNickname,
        question: null,
        roomStatus: roomStatus,
      }));

      setRoom({
        masterNickname: masterNickname,
        roomId: roomId,
        roomStatus: roomStatus,
      });

      setUsers(prevUsers => prevUsers.map(userEl => ({ ...userEl, score: 0 })));
    });

    socket?.on("gameStart", data => {
      console.log(data);
      setCurrentRoomInfo(data);
    });

    return () => {
      socket?.off("sendMessage", handleSendMessage);
      setChatMessages(null);
    };
  }, [users, socket, setRoom, roomId, chatMessages, currentRoomInfo]);

  // useEffect(() => {
  //   let timer: number;
  //   if (countdown !== null) {
  //     if (countdown > 0) {
  //       timer = setTimeout(() => {
  //         setCountdown(countdown - 1);
  //       }, 1000);
  //     } else {
  //       setCountdown(null); // 카운트다운 끝
  //     }
  //   }

  //   return () => clearTimeout(timer);
  // }, [countdown, socket, roomId]);

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
          clearInterval(clear);
          setStageTimer(null);
          setStageModalOpen(true);
          setTimeout(() => {
            nextTurn();
            setStageModalOpen(false);
          }, 2000);
        }
      }, 1000);
    }

    return () => clearInterval(clear);
  }, [socket, currentRoomInfo]);

  // 채팅 보내는 이벤
  const submitChat = (data: { chatMessage: string; roomId?: string; isAnswer: boolean }) => {
    socket?.emit("sendMessage", data);
  };

  const gameStart = () => {
    // 개발 시에는 2명 이상, 릴리즈 시에는 3명 이상으로 변경 요망
    if (users.length >= 2) {
      socket?.emit("gameStart", roomId);
    } else {
      setOpen(true);
      setErrMessage("3명 이상 시작 가능합니다");
    }
  };

  const emitDraw = (x: number, y: number, stopDraw: boolean, color: string, erase: boolean) => {
    console.log("소켓으로 보냄", x, y);
    socket?.emit("draw", { roomId, x, y, stopDraw, color, erase });
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
    gameResult,
    answerUser,
    stageModalOpen,
  };
};
