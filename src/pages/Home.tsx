import Pagination from "../components/Home/Pagination";
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

const pagination = {
  currentPage: 1,
  totalPage: 5,
};

const Home = () => {
  return (
    <div className="w-full h-full">
      <div className="h-[10%] flex mb-5 relative">
        <CreateRoomModal />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Pagination pagination={pagination} />
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 overflow-auto h-[85%] gap-4">
        {roomsData.map((room) => (
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
    </div>
  );
};

export default Home;
