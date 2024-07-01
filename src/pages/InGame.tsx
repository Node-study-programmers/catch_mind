import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import screenfull from 'screenfull';
import AlertModal from '../components/modal/AlertModal';
import mainImg from '../asset/img/mainBackground.png';
import gameBoard from '../asset/img/gameBoard.png';
import { RoomUser } from '../types';
import UserContainer from '../components/Game/UserContainer';
import { useSocket } from '../hooks/useSocket';
import Input from '../components/Input';
import { userStore } from '../store/userStore';

const InGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [masterNickname, setMaster] = useState<string>();
  const user = userStore(state => state.user);
  const [currentDrawer, setCurrentDrawer] = useState<RoomUser>();
  const [currentAns, setCurrentAns] = useState<string | null>(null);
  const [stageTimer, setStageTimer] = useState<string | null>(null);
  const location = useLocation();

  const { submitChat, users, handleClose, open, errMessage, gameStart, gameStatus } = useSocket(roomId!);

  useEffect(() => {
    setMaster(location.state.master);
  }, []);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  const handleLeaveRoom = () => {
    //방 나가기
    navigate('/');
  };

  return (
    <>
      <div className="relative w-screen h-screen min-w-[1280px] px-10">
        <AlertModal open={open} handleClose={handleClose} message={errMessage} />
        <div
          className="absolute inset-0 bg-cover bg-center -z-50"
          style={{
            backgroundImage: `url(${mainImg})`,
            opacity: 0.5,
            backgroundAttachment: 'fixed',
          }}
        ></div>
        {/* header */}
        <div className="h-[7%] w-full text-right py-3">
          <button className="bg-red-500 text-white py-3 px-5 rounded-2xl hover:bg-red-300" onClick={handleLeaveRoom}>
            나가기
          </button>
        </div>
        {/* 유저 1~3명 */}
        <div className="h-[93%] py-24 flex justify-between">
          <div className="grid h-full grid-cols-1 grid-rows-3 justify-items-center gap-10 w-1/5">
            {users.slice(0, 3).map(user => (
              <UserContainer
                key={user.userId}
                userId={user.userId}
                nickname={user.nickname}
                score={user.score}
                currentDraw={false}
                profileImage={user.profileImage}
                masterName={masterNickname!}
                isLeft={true}
              />
            ))}
          </div>

          {gameStatus === 'playing' ? (
            <div className="h-full flex flex-col justify-around items-center w-1/2">
              <div className="bg-blue-300 h-[50px] flex items-center justify-center text-3xl w-[80%]">
                제시어 : 포도
              </div>
              {/* 게임 보드 */}
              <div
                className="w-full h-[70%] aspect-video mx-auto"
                style={{
                  background: `url(${gameBoard})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              {/* <div className="flex justify-end ">
              <Button buttonStyle="submit">다 지우기</Button>
            </div> */}
              <div className="w-full grid grid-cols-2 h-[80px] gap-3">
                <div className="w-full border-2 rounded-l-full h-full bg-blue-300 flex justify-center items-center text-2xl">
                  TIMER : 00:59
                </div>
                <Input type="chat" placeholder="정답을 입력하세요." />
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-around items-center w-1/2 rounded-xl">
              {/* 방장일시 */}
              {masterNickname === user.nickname ? (
                <button
                  className="bg-blue-500 text-white py-5 px-10 rounded-2xl text-2xl hover:bg-blue-300"
                  onClick={gameStart}
                >
                  게임 시작
                </button>
              ) : (
                <div className="text-2xl bg-blue-500 text-white p-5 px-10 rounded-2xl">
                  방장의 게임시작을 기다리는 중입니다...
                </div>
              )}
            </div>
          )}

          {/* 유저 4~명 */}
          <div className="grid h-full grid-cols-1 grid-rows-3 justify-items-center gap-10 w-1/5">
            {users.slice(3, 6).map(user => (
              <UserContainer
                key={user.userId}
                userId={user.userId}
                nickname={user.nickname}
                score={user.score}
                profileImage={user.profileImage}
                masterName={masterNickname!}
                currentDraw={true}
                isLeft={false}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InGame;
