import { Box, Modal, Typography } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AlertModal = ({ open, handleClose }: Props) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          이미 게임이 시작된 방입니다.
        </Typography>
      </Box>
    </Modal>
  );
};

export default AlertModal;
