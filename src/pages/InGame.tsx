import React, { FormEvent, useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../components/modal/AlertModal";
import mainImg from "../asset/img/mainBackground.png";
import { GameStatus } from "../types";
import UserContainer from "../components/Game/UserContainer";
import { chatMessageType, useSocket } from "../hooks/useSocket";
import { userStore } from "../store/userStore";
import { roomStore } from "../store/roomStore";
import GameBoard from "../components/Game/GameBoard";
import ResultModal from "../components/modal/ResultModal";
import CountModal from "../components/modal/CountModal";
import Button from "../components/Button";
import DrawController from "../components/Game/DrawController";
import StageModal from "../components/modal/StageModal";


const InGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [masterNickname, setMaster] = useState<string | null>(null);
  const user = userStore((state) => state.user);
  const [currentDrawer, setCurrentDrawer] = useState<string | null>(null);
  const [currentAns, setCurrentAns] = useState<string | null>(null);
  const { setRoom, removeRoom, currentRoom } = roomStore((state) => state);
  const [roomStatus, setRoomStatus] = useState<GameStatus>("waiting");
  const [chattings, setChattings] = useState<chatMessageType | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameResultModalOpen, setGameResultModalOpen] =
    useState<boolean>(false);
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("#000000");

  const {
    submitChat,
    users,
    handleClose,
    open,
    errMessage,
    gameStart,
    currentRoomInfo,
    countdown,
    stageTimer,
    drawPosition,
    emitDraw,
    chatMessages,
    setDrawPosition,
    gameResult,
    answerUser,
    stageModalOpen,
  } = useSocket(roomId!);

  useEffect(() => {
    setChattings(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    if (gameResult) {
      setGameResultModalOpen(true);
      setTimeout(() => {
        setGameResultModalOpen(false);
      }, 7000);
    }
  }, [gameResult]);

  useEffect(() => {
    if (currentRoomInfo) {
      setCurrentDrawer(currentRoomInfo.nickname);
      setCurrentAns(currentRoomInfo.question);
      setRoomStatus(currentRoomInfo.roomStatus);
    }
    if (currentRoomInfo?.roomStatus === "waiting") {
      setCurrentDrawer(null);
    }
    setMaster(currentRoom.masterNickname);
  }, [currentRoom.masterNickname, currentRoomInfo]);

  const handleClearBoard = () => {
    if (canvasRef.current) {
      emitDraw(0, 0, false, color, true);
      getCtx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setDrawPosition(undefined);
      getCtx?.beginPath();
    }
  };

  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  const handleLeaveRoom = () => {
    removeRoom();
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const handleChatting = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userChat = inputRef.current?.value;
    const isAnswer = currentAns === userChat;

    submitChat({ chatMessage: userChat!, roomId, isAnswer });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const memoizedUserContainers = useMemo(() => {
    return users.slice(0, 6).map((user, index) => {
      let userMessages;
      if (chattings) {
        userMessages = chattings?.nickname === user.nickname ? chattings : null;
      } else {
        userMessages = null;
      }


      console.log(userMessages, user.nickname, "in memo");
      return (
        <UserContainer
          key={user.userId}
          userId={user.userId}
          nickname={user.nickname}
          score={user.score}
          currentDraw={currentDrawer === user.nickname}
          profileImage={user.profileImage}
          masterName={masterNickname!}
          chatMessages={userMessages}
          currentRoom={currentRoomInfo?.roomStatus}
          isLeft={index < 3} // index를 사용하여 isLeft 결정
        />
      );
    });
  }, [
    users,
    chattings,
    currentDrawer,
    masterNickname,
    currentRoomInfo?.roomStatus,
  ]);
  console.log(countdown);


  return (
    <>
      <div className="relative w-screen h-screen min-w-[1280px] px-10">
        <ResultModal userData={gameResult} open={gameResultModalOpen} />
        <AlertModal
          open={open}
          handleClose={handleClose}
          message={errMessage}
        />
        <StageModal open={stageModalOpen} answerUser={answerUser} currentRoomInfo={currentRoomInfo} users={users} />

        <div
          className="absolute inset-0 bg-cover bg-center -z-50"
          style={{
            backgroundImage: `url(${mainImg})`,
            opacity: 0.5,
            backgroundAttachment: "fixed",
          }}></div>
        {/* header */}
        <div className="h-[7%] w-full text-right py-3">
          <button
            className="bg-red-500 text-white py-3 px-5 rounded-2xl hover:bg-red-300"
            onClick={handleLeaveRoom}>
            나가기
          </button>
        </div>
        {/* 유저 1~3명 */}
        <div className="h-[93%] py-24 flex justify-between">
          <div className="grid h-full grid-cols-1 grid-rows-3 justify-items-center gap-10 w-1/5">
            {memoizedUserContainers.slice(0, 3)}
          </div>

          {countdown !== null ? (
            <CountModal countdown={countdown} />
          ) : roomStatus === "playing" ? (
            <div className="h-full flex flex-col justify-around items-center w-1/2">
              <div className="bg-blue-300 h-[50px] flex items-center justify-center text-3xl w-[80%]">
                {user.nickname === currentRoomInfo?.nickname
                  ? `제시어 : ${currentRoomInfo?.question}`
                  : `${currentRoomInfo?.nickname}님이 그리는 중입니다`}
              </div>
              {/* 게임 보드 */}
              <GameBoard
                emitDraw={emitDraw}
                drawPosition={drawPosition}
                currentRoomInfo={currentRoomInfo}
                canvasRef={canvasRef}
                setGetCtx={setGetCtx}
                getCtx={getCtx}
                handleClearBoard={handleClearBoard}
                color={color}
              />
              <div className="w-full grid grid-cols-2 h-[80px] gap-3">
                <div className="w-full border-2 rounded-l-full h-full bg-blue-300 flex justify-center items-center text-2xl">
                  TIMER : {stageTimer}
                </div>
                {currentRoomInfo?.nickname === user.nickname ? (
                  <DrawController
                    color={color}
                    setColor={setColor}
                    handleChangeColor={handleChangeColor}
                    handleClearBoard={handleClearBoard}
                  />
                ) : (
                  <form onSubmit={handleChatting}>
                    <div className="flex w-full h-full">
                      <input
                        type="text"
                        ref={inputRef}
                        className="border-2 rounded-r-full focus:outline-none focus:border-yellow-300 p-3 w-full text-2xl"
                        placeholder="정답을 입력하세요."
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-around items-center w-1/2 rounded-xl">
              {/* 방장일시 */}
              {masterNickname === user.nickname ? (
                <button
                  className="bg-blue-500 text-white py-5 px-10 rounded-2xl text-2xl hover:bg-blue-300"
                  onClick={gameStart}>
                  게임 시작
                </button>
              ) : (
                <div className="text-2xl bg-blue-500 text-white p-5 px-10 rounded-2xl">
                  방장의 게임시작을 기다리는 중입니다...
                </div>
              )}
            </div>
          )}

          {/* 유저 4~명 */}
          <div className="grid h-full grid-cols-1 grid-rows-3 justify-items-center gap-10 w-1/5">
            {memoizedUserContainers.slice(3)}
          </div>
        </div>
      </div>
    </>
  );
};

export default InGame;
