import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import mascot from "../asset/img/mascot.png";
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
    <div className="w-full h-full flex flex-col p-10">
      <div className="text-5xl font-titleW flex justify-between">
        MY INFO
        <img src={mascot} alt="mascot-img" className="w-32 h-32" />
      </div>
      <div className="grid grid-cols-3 w-full h-full gap-16 items-center">
        {/* 아바타 */}
        <div className="h-2/3">
          <h2 className="text-lg">Profile</h2>
          <div
            style={{
              boxShadow: "8px 8px 16px #a1a1a1, -8px -8px 16px #ffffff",
            }}
            className="flex flex-col items-center h-full justify-around bg-[#e0e0e0] rounded-2xl">
            <img
              src={userData[0].profileUrl}
              alt="user"
              className="w-28 h-28 lg:w-48 lg:h-48 rounded-full"
            />
            <button
              className="text-blue-500"
              onClick={() => setModalOpen(true)}>
              replace
            </button>
            <ImageModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </div>
        {/* 이메일, 비밀번호, 닉네임 */}
        <div className="h-2/3 flex flex-col justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg">NickName</h2>
            <div className="flex">
              <Input type="shadow" value={userData[0].nickname} disabled />
              <Button buttonStyle="submit">수정하기</Button>
            </div>
          </div>
          <div>
            <h2 className="text-lg">Email</h2>
            <Input type="shadow" disabled value={userData[0].email} />
          </div>
          <div>
            <h2 className="text-lg">PassWord</h2>
            <div className="flex">
              <Input type="shadow" value="****" disabled />
              <Button buttonStyle="submit">수정하기</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col p-5 rounded-3xl w-48 h-48"
            style={{
              boxShadow: "8px 8px 16px #a1a1a1, -8px -8px 16px #ffffff",
            }}>
            <h2 className="text-3xl">Total Score</h2>
            <p className="text-5xl font-titleW p-3 underline">
              {userData[0].totalScore}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
