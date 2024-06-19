import React from "react";
import Room from "../components/Room";
import CreateRoomModal from "../components/modal/CreateRoomModal";

//임시 데이터
const roomsData = [
  {
    roomId: "1",
    profileUrl: "https://picsum.photos/500/500",
    roomMaster: "골목대장",
    roomName: "방 제목",
    currentUser: 3,
    maxUser: 6,
    started: false,
  },
  {
    roomId: "2",
    profileUrl: "https://picsum.photos/500/500",
    roomMaster: "골목대장",
    roomName: "방 제목",
    currentUser: 3,
    maxUser: 6,
    started: false,
  },
  {
    roomId: "3",
    profileUrl: "https://picsum.photos/500/500",
    roomMaster: "골목대장",
    roomName: "방 제목",
    currentUser: 3,
    maxUser: 6,
    started: true,
  },
  {
    roomId: "4",
    profileUrl: "https://picsum.photos/500/500",
    roomMaster: "골목대장",
    roomName: "방 제목",
    currentUser: 3,
    maxUser: 6,
    started: true,
  },
];

const Home = () => {
  return (
    <div className="grid grid-cols-2 overflow-auto w-full h-full  max-h-full gap-4">
      {roomsData.map(room => (
        <Room
          key={room.roomId}
          profileUrl={room.profileUrl}
          roomId={room.roomId}
          roomMaster={room.roomMaster}
          roomName={room.roomName}
          currentUser={room.currentUser}
          maxUser={room.maxUser}
          started={room.started}
        />
      ))}
    </div>
  );
};

export default Home;
