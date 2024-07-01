import { IoChatbox } from "react-icons/io5";

interface Props {
  chatMessage: string;
  isLeft: boolean;
}
const ChatModal = ({ chatMessage, isLeft }: Props) => {
  return (
    <div
      className={`absolute ${
        isLeft ? "right-[-250px] top-[-80px]" : "left-[-250px] top-[-80px]"
      } z-[9999] w-96 h-32 flex justify-center items-center`}>
      <div className="relative h-full w-[150px] flex justify-center items-center">
        <IoChatbox
          className={`absolute fill-slate-400 text-[200px] ${
            !isLeft && "scale-x-[-1]"
          }`}
        />
        <text className="absolute flex justify-center flex-wrap w-full mb-10 overflow-hidden break-all">
          {chatMessage}
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세
        </text>
      </div>
    </div>
  );
};

export default ChatModal;
