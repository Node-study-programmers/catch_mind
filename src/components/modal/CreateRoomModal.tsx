import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { Button as MButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom } from '../../api/room.api';
import AlertModal from './AlertModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '20px',
  transform: 'translate(-50%, -50%)',
  height: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CreateRoomModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    createRoom({ roomName: roomName })
      .then(data => {
        joinRoom({ roomId: data.roomId }).then(() => {
          setIsLoading(true);
          setTimeout(() => {
            navigate(`/ingame/${data.roomId}`, { state: { master: data.masterNickname } }); //방생성 성공시 방으로 리다이렉트
          }, 2000);
        });
      })
      .catch((e: Error) => console.log(e));
  };

  if (isLoading) {
    return <AlertModal open={true} handleClose={() => {}} message="방 생성중..." isLoadingAlert={true} />;
  }

  return (
    <>
      <Button buttonStyle="shadow" onClick={handleOpen}>
        방 생성
      </Button>

      <Modal
        sx={{ borderRadius: '' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ borderBottom: '2px solid' }} id="modal-modal-title" variant="h6" component="h2">
            방 만들기
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            제목
            <Input type="normal" onChange={e => setRoomName(e.target.value)} />
          </Typography>
          <MButton onClick={handleCreateRoom}>방 생성</MButton>
        </Box>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
