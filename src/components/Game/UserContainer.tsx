import { RoomUser } from "../../types";

const UserContainer = ({
  userId,
  nickname,
  profileImage,
  score,
  isLeft,
  currentDraw,
}: RoomUser) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-fit bg-white rounded-2xl ${
        currentDraw && "border-8 border-yellow-500"
      } ${isLeft ? "row" : "flex-row-reverse"}`}>
      <img
        className={`h-40 w-40`}
        src={`${import.meta.env.VITE_IMG_URL}${profileImage}`}
        alt="userProfile"
      />
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
