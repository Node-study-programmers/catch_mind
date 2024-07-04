import { Box, Modal, Typography } from "@mui/material";
import { chatMessageType, currentRoomInfoType } from "../../hooks/useSocket";
import { RoomUser } from "../../types";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface Props {
  open: boolean;
  answerUser: chatMessageType | null;
  currentRoomInfo: currentRoomInfoType | undefined;
  users: RoomUser[];
}

const StageModal = ({ open, answerUser, currentRoomInfo, users }: Props) => {
  if (!open) return null;

  // useEffect(() => {
  //   console.log()
  // }, []);

  return createPortal(
    <div className="fixed w-screen h-screen top-0 left-0 z-50 bg-[rgba(0,0,0,0.6)]">
      <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5 flex flex-col items-center text-white w-1/2">
        <div
          style={{ transform: "rotate(-5deg)", fontFamily: "Rubik Mono One" }}
          className="text-6xl w-2/3 text-center absolute -top-8 left-0">
          NEXT STAGE
          <span className="absolute left-0 bottom-[-10px] w-full h-[2px] bg-white animate-underline"></span>
        </div>
        <div className="w-full mt-40 h-full flex justify-around">
          <div className="text-3xl">
            정답 :{" "}
            <span className="text-5xl p-2 animate-circledraw relative animate-text-grow">
              {currentRoomInfo?.question}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="animate-circle-draw w-full h-full border-4 border-red-500 rounded-full transform scale-0"></span>
              </span>
            </span>
          </div>
          <div>
            {users.find((user) => user.nickname === answerUser?.nickname) ? (
              <div className="flex gap-5 items-center">
                <img
                  className="w-32 h-32 rounded-full aspect-square"
                  src="https://port-0-catch-mind-ly5qmhc1cd365acd.sel5.cloudtype.app/profileImages/Basic.jpg"
                  alt="profileImg"
                />
                <span className="flex items-center h-full text-3xl bg-blue-400 px-5 py-1 rounded-2xl">
                  {answerUser?.nickname}
                </span>
                <br />
                님이 정답을 맞추셨습니다!
              </div>
            ) : (
              <div className="text-2xl">정답을 맞춘 사람이 없습니다</div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StageModal;
