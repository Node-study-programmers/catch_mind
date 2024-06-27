import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../components/modal/AlertModal";
import { joinRoom } from "../api/room.api";
import mainImg from "../asset/img/mainBackground.png";
import gameBoard from "../asset/img/gameBoard.png";
import { RoomUser } from "../types";
import UserContainer from "../components/Game/UserContainer";
import Button from "../components/Button";
import { useSocket } from "../hooks/useSocket";

const InGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<RoomUser[]>([
    { userId: "asd", nickname: "닉넴1", score: 0, profileImage: "Basic.jpg" }, //디자인용 임시 데이터
    { userId: "asd", nickname: "닉넴2", score: 0, profileImage: "Basic.jpg" },
    { userId: "asd", nickname: "닉넴3", score: 0, profileImage: "Basic.jpg" },
    { userId: "asd", nickname: "닉넴4", score: 0, profileImage: "Basic.jpg" },
    { userId: "asd", nickname: "닉넴5", score: 0, profileImage: "Basic.jpg" },
    { userId: "asd", nickname: "닉넴6", score: 0, profileImage: "Basic.jpg" },
  ]);
  const [message, setMessage] = useState("");
  const { submitChat } = useSocket();
  const handleClose = () => {
    setOpen(true);
    navigate("/");
  };

  // useEffect(() => {
  //   //방 입장시 한번만 API호출
  //   joinRoom({ roomId: roomId! })
  //     .then(data => setUsers(data.roomUsers))
  //     .catch(e => {
  //       setMessage(e.response.data.message); //에러시 에러 메세지 출력
  //       setOpen(true);
  //     });
  // }, []);

  return (
    <>
      <div className="relative w-screen h-screen max-h-screen max-w-screen flex justify-around items-center">
        <AlertModal open={open} handleClose={handleClose} message={message} />
        <div
          className="absolute inset-0 bg-cover bg-center -z-50"
          style={{ backgroundImage: `url(${mainImg})`, opacity: 0.5, backgroundAttachment: "fixed" }}
        ></div>
        {/* 유저 1~3명 */}
        <div className="flex w-full h-full justify-around items-center">
          <div className="grid min-w-[350px] max-w-[450px] h-full grid-cols-1 grid-rows-3 justify-items-center gap-2">
            {users.slice(0, 3).map(user => (
              <UserContainer
                userId={user.userId}
                nickname={user.nickname}
                score={user.score}
                profileImage={user.profileImage}
              />
            ))}
          </div>

          <div className="w-full max-w-full flex flex-col justify-center">
            {/* 게임 보드 */}
            <div> 제시어 : '몰라'</div>
            <div
              className="min-w-[690px] max-w-full aspect-video"
              style={{
                background: `url(${gameBoard})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="flex justify-end ">
              <Button buttonStyle="submit">다 지우기</Button>
            </div>
          </div>

          {/* 유저 4~명 */}
          <div className="grid min-w-[350px] max-w-[450px] h-full grid-cols-1 grid-rows-3 justify-items-center gap-2">
            {users.slice(3, 6).map(user => (
              <UserContainer
                userId={user.userId}
                nickname={user.nickname}
                score={user.score}
                profileImage={user.profileImage}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InGame;
