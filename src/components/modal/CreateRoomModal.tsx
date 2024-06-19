import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Input from "../Input";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "20px",
  transform: "translate(-50%, -50%)",
  height: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateRoomModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>방 생성</Button>
      <Modal
        sx={{ borderRadius: "" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ borderBottom: "2px solid" }} id="modal-modal-title" variant="h6" component="h2">
            방 만들기
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            제목
            <Input type="normal" />
          </Typography>
          <Button onClick={handleOpen}>방 생성</Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
