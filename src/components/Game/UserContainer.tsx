import React from "react";
import { RoomUser } from "../../types";

const UserContainer = ({ userId, nickname, profileImage, score }: RoomUser) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[40%] bg-white rounded-2xl">
      <img
        className="flex-[2] rounded-t-2xl h-full"
        src={`${import.meta.env.VITE_IMG_URL}${profileImage}`}
        alt="userProfile"
      />
      <div className="flex-[1]  border-y-[1px] border-black w-full flex justify-center items-center">{nickname}</div>
      <div className="flex-[1] flex items-center">점수 : {score}</div>
    </div>
  );
};

export default UserContainer;
