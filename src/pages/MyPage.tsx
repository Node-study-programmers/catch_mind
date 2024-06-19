import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
// import mascot from "../asset/img/mascot.png";
import ImageModal from "../components/modal/ImageModal";

const userData = [
  {
    profileUrl: "https://picsum.photos/500/500",
    nickname: "골목대장",
    totalScore: 129,
    email: "qwe@naver.com",
    password: "qweqwe",
  },
];

const MyPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-2 max_950px:flex max_950px:flex-col max_950px:pt-20 h-full">
      {/* 아바타 , score */}
      <div className="flex flex-col justify-center items-center">
        <div className="w-72 h-72">
          <div
            style={{
              boxShadow: "5px 5px 10px #99afcb, -5px -5px 10px #e5ffff",
            }}
            className="bg-[#BFDBFE] rounded-2xl w-full h-full flex flex-col items-center justify-center">
            <img
              src={userData[0].profileUrl}
              alt="user"
              className="w-[80%] h-[80%] m-auto rounded-full"
            />
            <button
              className="text-blue-500"
              onClick={() => setModalOpen(true)}>
              replace
            </button>
            <ImageModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </div>

        <div className="p-5 rounded-3xl flex justify-center items-center flex-col">
          <h2 className="text-3xl">Total Score</h2>
          <p className="text-5xl font-titleW p-3 underline">
            {userData[0].totalScore}
          </p>
        </div>
      </div>
      {/* 이메일, 비밀번호, 닉네임 */}
      <div className="flex flex-col gap-7 justify-center items-start max_950px:px-auto">
        <div className=" max_950px:flex mx-auto max_950px:justify-between gap-5">
          <h2 className="text-lg">NickName</h2>
          <div className="flex">
            <Input type="shadow" value={userData[0].nickname} disabled />
            <Button buttonStyle="submit">수정하기</Button>
          </div>
        </div>
        <div className="max_950px:flex mx-auto max_950px:justify-between gap-5">
          <h2 className="text-lg">Email</h2>
          <Input type="shadow" disabled value={userData[0].email} />
        </div>
        <div className="max_950px:flex mx-auto max_950px:justify-between gap-5 max_950px:pb-20">
          <h2 className="text-lg">PassWord</h2>
          <div className="flex">
            <Input type="shadow" value="****" disabled />
            <Button buttonStyle="submit">수정하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
