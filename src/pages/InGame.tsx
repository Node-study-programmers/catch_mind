import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../components/modal/AlertModal";
import mainImg from "../asset/img/mainBackground.png";
import { GameStatus } from "../types";
import UserContainer from "../components/Game/UserContainer";
import { chatMessageType, useSocket } from "../hooks/useSocket";
import Input from "../components/Input";
import { userStore } from "../store/userStore";
import { roomStore } from "../store/roomStore";
import GameBoard from "../components/Game/GameBoard";

const InGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [masterNickname, setMaster] = useState<string | null>(null);
  const user = userStore((state) => state.user);
  const [currentDrawer, setCurrentDrawer] = useState<string | null>(null);
  const [currentAns, setCurrentAns] = useState<string | null>(null);
  const { setRoom, removeRoom, currentRoom } = roomStore((state) => state);
  const [roomStatus, setRoomStatus] = useState<GameStatus>("waiting");
  // const [userChat, setUserChat] = useState<string>("");
  const [chattings, setChattings] = useState<chatMessageType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setDrawPosition,
    chatMessages,
  } = useSocket(roomId!);

  useEffect(() => {
    setChattings(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    if (currentRoomInfo) {
      setCurrentDrawer(currentRoomInfo.nickname);
      setCurrentAns(currentRoomInfo.question);
      setRoomStatus(currentRoomInfo.roomStatus);
    }
    setMaster(currentRoom.masterNickname);
  }, [currentRoom.masterNickname, setRoom, currentRoomInfo]);

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

  return (
    <>
      <div className="relative w-screen h-screen min-w-[1280px] px-10">
        <AlertModal
          open={open}
          handleClose={handleClose}
          message={errMessage}
        />
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
            {users.slice(0, 3).map((user) => {
              const userMessages = chattings
                .filter((chat) => chat.nickname === user.nickname)
                .slice(-1)
                .map((chat) => {
                  return { message: chat.message, isAnswer: chat.isAnswer };
                });
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
                  isLeft={true}
                />
              );
            })}
          </div>

          {countdown !== null ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white bg-blue-500 px-10 p-10 rounded-2xl">
              {countdown}
            </div>
          ) : roomStatus === "playing" ? (
            <div className="h-full flex flex-col justify-around items-center w-1/2">
              <div className="bg-blue-300 h-[50px] flex items-center justify-center text-3xl w-[80%]">
                {user.nickname === currentRoomInfo?.nickname
                  ? `제시어 : ${currentRoomInfo?.question}`
                  : `${currentRoomInfo?.nickname}님이 그리는 중입니다`}
              </div>
              {/* 게임 보드 */}
              <GameBoard emitDraw={emitDraw} setDrawPosition={setDrawPosition} drawPosition={drawPosition} />
              <div className="w-full grid grid-cols-2 h-[80px] gap-3">
                <div className="w-full border-2 rounded-l-full h-full bg-blue-300 flex justify-center items-center text-2xl">
                  TIMER : {stageTimer}
                </div>
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
            {users.slice(3, 6).map((user) => {
              const userMessages = chattings
                .filter((chat) => chat.nickname === user.nickname)
                .map((chat) => {
                  return { message: chat.message, isAnswer: chat.isAnswer };
                });
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
                  isLeft={false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default InGame;
