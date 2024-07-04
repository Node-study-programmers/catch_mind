import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { chatMessageType, currentRoomInfoType } from "../../hooks/useSocket";
import { RoomUser } from "../../types";

interface Props {
  open: boolean;
  answerUser: chatMessageType | null;
  currentRoomInfo: currentRoomInfoType | undefined;
  users: RoomUser[];
}

const StageModal = ({ open, answerUser, currentRoomInfo, users }: Props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 400,
    bgcolor: "background.paper",
    gap: 4,
    boxShadow: 24,
    zIndex: 9999,
    p: 4,
  };
  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          정답은 : {currentRoomInfo?.question}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {users.find(user => user.nickname === answerUser?.nickname)
            ? `${answerUser?.nickname} 님이 정답을 맞추셨습니다!`
            : "정답을 맞춘 사람이 없습니다"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {users.find(user => user.nickname === answerUser?.nickname) ? (
            <img
              className="w-[50%] aspect-square"
              src="https://port-0-catch-mind-ly5qmhc1cd365acd.sel5.cloudtype.app/profileImages/Basic.jpg"
              alt="profileImg"
            />
          ) : (
            "타임아웃"
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default StageModal;
