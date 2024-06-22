import { Box, Modal, Typography } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  message: string;
}

const AlertModal = ({ open, handleClose, message }: Props) => {
  const style = {
    position: "absolute",
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
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AlertModal;
