import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinRoom } from "../components/api/room.api";
import AlertModal from "../components/modal/AlertModal";

const InGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(true);
    navigate("/");
  };

  useEffect(() => {
    //방 입장시 한번만 API호출
    joinRoom({ roomId: roomId! })
      .then(data => console.log(data))
      .catch(e => {
        setMessage(e.response.data.message); //에러시 에러 메세지 출력
        setOpen(true);
      });
  }, []);

  return (
    <div>
      <AlertModal open={open} handleClose={handleClose} message={message} />
      InGame
    </div>
  );
};

export default InGame;
