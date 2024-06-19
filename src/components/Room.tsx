import React from "react";

interface Props {
  roomId: string;
  profileUrl: string;
  roomMaster: string;
  roomName: string;
  currentUser: number;
  maxUser: number;
  started: boolean;
}

const Room = ({ roomId, profileUrl, roomMaster, roomName, currentUser, maxUser, started }: Props) => {
  return (
    <div className="flex w-full h-full rounded-xl border bg-white">
      <div className="w-3/4 h-full">
        <img src={profileUrl} alt="roomImg" className="w-full h-full object-cover rounded-xl" />
      </div>
      <div className="h-full w-full flex flex-col  justify-around">
        <div className="flex justify-end pr-3">
          <div className={`w-5 h-5 ${started ? "bg-inGame" : "bg-waitingGame"} rounded-full`}></div>
        </div>
        <div className="flex flex-col pl-3">
          <p className="font-titleW text-2xl">{roomName}</p>
          <div className="opacity-[0.5]">
            <p>{roomMaster}</p>
            {currentUser} / {maxUser}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
