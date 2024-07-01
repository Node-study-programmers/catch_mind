import { RoomUser } from "../../types";

interface UserContainerProps extends RoomUser {
  isLeft: boolean;
}

const UserContainer = ({
  userId,
  nickname,
  profileImage,
  score,
  isLeft,
  currentDraw,
}: UserContainerProps) => {
  return (
    <div
      className={`flex items-center justify-center w-[350px] h-[175px] bg-white rounded-2xl ${
        currentDraw && "border-8 border-yellow-500"
      } ${isLeft ? "row" : "flex-row-reverse"}`}>
      <img
        className={`h-full w-[175px]`}
        src={`${import.meta.env.VITE_IMG_URL}${profileImage}`}
        alt="userProfile"
      />
      <div className="w-[175px] h-full flex flex-col justify-around items-center">
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
