import Pagination from "../components/Home/Pagination";
import Room from "../components/Room";
import CreateRoomModal from "../components/modal/CreateRoomModal";
import { useEffect, useState } from "react";
import { Room as IRoom } from "../types";
import { useRooms } from "../hooks/useRooms";

const Home = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { roomsData, isRoomsLoading, pagination } = useRooms();

  useEffect(() => {
    if (roomsData && !isRoomsLoading) {
      setRooms(roomsData);
    }
  }, [roomsData, isRoomsLoading]);

  return (
    <div className="w-full h-full">
      <div className="h-[10%] flex mb-5 relative">
        <CreateRoomModal />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Pagination pagination={pagination} />
        </div>
      </div>
      {rooms.length === 0 ? (
        <div className="w-full h-[85%] flex justify-center items-center font-titleW text-3xl">
          방을 만들어 주세요!
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-rows-2 overflow-auto h-[85%] gap-4">
          {rooms.map((room) => (
            <Room
              key={room.roomId}
              masterImage={room.masterImage}
              roomId={room.roomId}
              masterNickname={room.masterNickname}
              roomName={room.roomName}
              roomUsersCount={room.roomUsersCount}
              roomMaxCount={room.roomMaxCount}
              roomStatus={room.roomStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
