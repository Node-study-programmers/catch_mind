import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import AlertModal from "./modal/AlertModal";
import { Room as IRoom } from "../types";

interface Props {
  roomId: string;
  profileUrl: string;
  roomMaster: string;
  roomName: string;
  currentUser: number;
  maxUser: number;
  roomStatus: "waiting" | "playing";
}

const Room = ({ roomId, masterImage, masterNickname, roomName, roomUsersCount, roomMaxCount, roomStatus }: IRoom) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleInGame = () => {
    if (roomStatus === "playing") {
      return setOpen(true);
    }
    navigate(`/ingame/${roomId}`);
  };
  return (
    <div className="flex w-full h-full rounded-xl border bg-white">
      <AlertModal open={open} handleClose={handleClose} message="이미 게임이 시작된 방입니다" />
      <div className="w-3/4 h-full">
        <img
          src={`${import.meta.env.VITE_IMG_URL}${masterImage}`}
          alt="roomImg"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="h-full w-full flex flex-col  justify-around">
        <div className="flex justify-end pr-3">
          <div className={`w-5 h-5 ${roomStatus === "playing" ? "bg-inGame" : "bg-waitingGame"} rounded-full`}></div>
        </div>
        <div className="flex flex-col pl-3">
          <p className="font-titleW text-2xl">{roomName}</p>
          <div className="opacity-[0.5]">
            <p>{masterNickname}</p>
            {roomUsersCount} / {roomMaxCount}
          </div>
          <Button buttonStyle="ingame" onClick={handleInGame}>
            방 참가하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Room;
