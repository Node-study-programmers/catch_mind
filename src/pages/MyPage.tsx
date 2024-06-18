import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import mascot from "../asset/img/mascot.png";

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
  return (
    <div className="w-full h-full flex flex-col p-10 justify-center">
      <div className="text-5xl font-titleW flex justify-between">
        MY INFO
        <img src={mascot} alt="mascot-img" className="w-[150px] h-[150px]" />
      </div>
      <div className="grid grid-cols-3 w-[100%] h-full items-center gap-16">
        {/* 아바타 */}
        <div className="h-2/3 min-w-[180px]">
          <h2 className="text-lg">Profile</h2>
          <div
            style={{
              boxShadow: "8px 8px 16px #a1a1a1, -8px -8px 16px #ffffff",
            }}
            className="flex flex-col items-center h-full justify-around bg-[#e0e0e0] rounded-2xl">
            <img
              src={userData[0].profileUrl}
              alt="user"
              className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full"
            />
            <button className="text-blue-500">replace</button>
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
              <Input type="shadow" value="*******" disabled />
              <Button buttonStyle="submit">수정하기</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col p-5 rounded-3xl w-[200px] h-[200px]"
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
