import React from 'react';
import { CiChat1 } from 'react-icons/ci';
import { IoChatbox } from 'react-icons/io5';

interface Props {
  chatMessage: string;
  isLeft: boolean;
}
const ChatModal = ({ chatMessage, isLeft }: Props) => {
  return (
    <div
      className={`absolute ${
        isLeft ? 'right-[-250px] top-[-80px]' : 'left-[-250px] top-[-80px]'
      }  z-[9999]  w-96 h-32 flex justify-center items-center`}
    >
      <div className="relative w-[150px] h-full max-w-[150px] flex justify-center items-center">
        <IoChatbox className={`absolute fill-yellow-200 text-[200px] ${!isLeft && 'scale-x-[-1]'}`} />

        <text className="absolute flex  max-w-[150px] h-[150px] items-center font-titleW justify-center mb-10 break-all whitespace-normal overflow-hidden">
          {chatMessage}
        </text>
      </div>
    </div>
  );
};

export default ChatModal;
