import { Box, Modal, Typography } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  message: string;
  isLoadingAlert?: boolean;
}

const AlertModal = ({ open, handleClose, message, isLoadingAlert }: Props) => {
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

  const loadingStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    fontWeight: "700",
  };

  if (isLoadingAlert) {
    return (
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={loadingStyle}>{message}</Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AlertModal;
