import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
// import mascot from "../asset/img/mascot.png";
import ImageModal from "../components/modal/ImageModal";
import { replaceNickName, replacePassword } from "../components/api/replace.api";
import { userStore } from "../store/userStore";
import AlertModal from "../components/modal/AlertModal";

const userData = [
  {
    profileUrl: "https://picsum.photos/500/500",
    nickname: "골목대장",
    totalScore: 129,
    email: "qwe@naver.com",
    password: "qweqwe",
  },
];

const DEFAULT_PASSWORD = "****";

const MyPage = () => {
  const { user, setUser } = userStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isNickDisabled, setNickDisabled] = useState(true);
  const [isPasswordDisabled, setPasswordDisabled] = useState(true);
  const [newNick, setNewNick] = useState(user.nickname!); //전역 상태 유저 닉넴
  const [newPwd, setNewPwd] = useState(DEFAULT_PASSWORD); //비밀번호 변경 상태
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [AlretMessage, setAlretMessageMessage] = useState("");
  const nickNameRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);

  const handleNickInputOpen = () => setNickDisabled(false);
  const handlePasswordInputOpen = () => {
    setPasswordDisabled(false);
    setNewPwd("");
  };

  const handleOutsideNickName = (e: MouseEvent) => {
    if (nickNameRef.current && !nickNameRef.current.contains(e.target as Node)) {
      setNewNick(user.nickname!);
      setNickDisabled(true);
    }
  };

  const handleOutsidePassword = (e: MouseEvent) => {
    if (passwordRef.current && !passwordRef.current.contains(e.target as Node)) {
      setNewPwd(DEFAULT_PASSWORD);
      setPasswordDisabled(true);
    }
  };

  const handleChageNickname = () => {
    replaceNickName({ nickname: newNick })
      .then(data => {
        setUser({ ...user, nickname: data.nickname });
        setAlretMessageMessage("닉네임 변경 완료");
        setOpen(true);
      })
      .catch(e => {
        setAlretMessageMessage(e.response.data.message);
        setOpen(true);
      });
  };

  const handleChagePassword = () => {
    replacePassword({ password: newPwd })
      .then(data => {
        setAlretMessageMessage("비밀번호 변경 완료");
        setOpen(true);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideNickName);
    document.addEventListener("mousedown", handleOutsidePassword);

    return () => {
      document.removeEventListener("mousedown", handleOutsideNickName);
      document.removeEventListener("mousedown", handleOutsidePassword);
    };
  }, [user]);

  return (
    <div className="grid grid-cols-2 max_950px:flex max_950px:flex-col max_950px:pt-20 h-full">
      {/* 아바타 , score */}
      <AlertModal open={open} handleClose={handleClose} message={AlretMessage} />
      <div className="flex flex-col justify-center items-center">
        <div className="w-72 h-72">
          <div
            style={{
              boxShadow: "5px 5px 10px #99afcb, -5px -5px 10px #e5ffff",
            }}
            className="bg-[#BFDBFE] rounded-2xl w-full h-full flex flex-col items-center justify-center"
          >
            <img src={user.profileImage!} alt="user" className="w-[80%] h-[80%] m-auto rounded-full" />
            <button className="text-blue-500" onClick={() => setModalOpen(true)}>
              replace
            </button>
            <ImageModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </div>

        <div className="p-5 rounded-3xl flex justify-center items-center flex-col max_950px:my-5">
          <h2 className="text-3xl">Total Score</h2>
          <p className="text-5xl font-titleW p-3 underline">{user.score}</p>
        </div>
      </div>
      {/* 이메일, 비밀번호, 닉네임 */}
      <div className="flex flex-col gap-7 justify-center items-start max_950px:px-auto max_950px:items-start max_950px:mx-auto">
        <div className=" max_950px:flex max_950px:justify-between gap-5">
          <h2 className="text-lg">NickName</h2>
          <div className="flex" ref={nickNameRef}>
            <Input type="shadow" value={newNick} disabled={isNickDisabled} onChange={e => setNewNick(e.target.value)} />
            {isNickDisabled ? (
              <Button buttonStyle="submit" onClick={handleNickInputOpen}>
                수정하기
              </Button>
            ) : (
              <Button buttonStyle="submit" onClick={handleChageNickname}>
                완료
              </Button>
            )}
          </div>
        </div>
        <div className="max_950px:flex max_950px:justify-between gap-5">
          <h2 className="text-lg">Email</h2>
          <Input type="shadow" disabled value={user.email!} />
        </div>
        <div className="max_950px:flex max_950px:justify-between gap-5 max_950px:pb-20">
          <h2 className="text-lg">PassWord</h2>
          <div className="flex" ref={passwordRef}>
            <Input
              type="shadow"
              value={newPwd}
              disabled={isPasswordDisabled}
              onChange={e => setNewPwd(e.target.value)}
            />
            {isPasswordDisabled ? (
              <Button buttonStyle="submit" onClick={handlePasswordInputOpen}>
                수정하기
              </Button>
            ) : (
              <Button buttonStyle="submit" onClick={handleChagePassword}>
                완료
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
