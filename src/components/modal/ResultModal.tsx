import React from "react";
import { createPortal } from "react-dom";
import { RoomUser } from "../../types";

interface ResultModalProps {
  userData?: RoomUser[];
  open: boolean;
}

const ResultModal = ({ userData, open }: ResultModalProps) => {
  if (!open || !userData) return null;

  const sortedUserData = [...userData].sort((a, b) => b.score - a.score);

  return createPortal(
    <div className="fixed w-screen h-screen top-0 left-0 z-50 bg-[rgba(0,0,0,0.6)]">
      <div className="top-1/2 left-1/2 absolute w-[30%] h-[70%] -translate-x-1/2 -translate-y-1/3 rounded-3xl p-5 flex flex-col items-center">
        <div
          style={{ transform: "rotate(-5deg)", fontFamily: "Rubik Mono One" }}
          className="text-6xl text-white w-full text-center absolute -top-8 left-0">
          RESULT
          <span className="absolute left-0 bottom-[-10px] w-full h-[2px] bg-white animate-underline"></span>
        </div>
        <div className="w-full mt-20 h-full overflow-scroll">
          {sortedUserData?.map((user, index) => (
            <div
              key={user.userId}
              className="w-full h-20 bg-white mb-2 rounded-2xl grid grid-cols-[1fr_1fr_4fr_1fr] items-center px-10 gap-4">
              <div className="text-3xl">{index + 1}</div>
              <div className="rounded-full w-14 h-14 bg-red-300">
                {user.profileImage}
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {user.nickname}
              </div>
              <div
                className="text-2xl text-teal-500"
                style={{ fontFamily: "Rubik Mono One" }}>
                {user.score}점
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResultModal;
