import { useState, useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import { GameStatus, RoomUser } from "../../types";
import ChatModal, { chatMessage } from "../modal/ChatModal";
import { userStore } from "../../store/userStore";

interface UserContainerProps extends RoomUser {
  isLeft: boolean;
  masterName: string;
  chatMessages: chatMessage | null;
  currentRoom: GameStatus | undefined;
}

const UserContainer = ({
  nickname,
  profileImage,
  score,
  isLeft,
  currentDraw,
  masterName,
  chatMessages,
  currentRoom,
}: UserContainerProps) => {
  const [visibleMessage, setVisibleMessage] = useState<chatMessage | null>(
    null
  );
  const user = userStore((state) => state.user);
  console.log(visibleMessage, nickname);

  useEffect(() => {
    if (currentRoom === "waiting") {
      setVisibleMessage(null);
    }
    if (chatMessages) {
      setVisibleMessage(chatMessages);
      const timer = setTimeout(() => {
        setVisibleMessage(null);
        console.log(visibleMessage, "visible message");
        console.log("hihi");
      }, 2000);

      return () => clearTimeout(timer);
    } else if (chatMessages === null) {
      if (visibleMessage) {
        const timer = setTimeout(() => {
          setVisibleMessage(null);
          console.log(visibleMessage, "visible message");
          console.log("hihi");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [chatMessages, currentRoom]);

  return (
    <div
      className={`flex items-center justify-center relative w-full h-full bg-white rounded-2xl ${
        currentDraw && "border-4 border-green-400"
      } ${isLeft ? "row" : "flex-row-reverse"}`}>
      {visibleMessage && (
        <ChatModal chatMessage={visibleMessage} isLeft={isLeft} />
      )}
      {currentDraw && (
        <div
          style={{ transform: "rotate(10deg)", fontFamily: "Rubik Mono One" }}
          className={`absolute -top-0 ${
            isLeft ? "-right-10" : "-left-10"
          } text-green-500 rounded-full px-2 py-1 font-bold z-[30] text-3xl`}>
          TURN
        </div>
      )}
      {user.nickname === nickname && (
        <div
          style={{ fontFamily: "Rubik Mono One" }}
          className={`absolute -top-0 ${
            !isLeft ? "-right-0" : "-left-0"
          } text-blue-500 bg-white rounded-full px-2 py-1 font-bold z-[30] text-3xl`}>
          ME
        </div>
      )}
      <div className="w-1/2 h-full relative">
        {masterName === nickname && (
          <FaCrown className="absolute text-4xl top-[-30px] fill-yellow-200 z-50" />
        )}
        <img
          className="h-full w-full"
          src={`${import.meta.env.VITE_IMG_URL}${profileImage}`}
          alt="userProfile"
        />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-around items-center">
        <div className="w-3/4 text-center text-lg font-bold border-b border-black pb-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {nickname}
        </div>
        <div className="flex items-center">
          SCORE : <span className="font-bold ml-2">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
