import React, { useState } from "react";
import mainImg from "../asset/img/mainBackground.png";
import Join from "../components/Join";
import Login from "../components/Login";

type Auth = "join" | "login";

const AuthPage = () => {
  const [select, setSelect] = useState<Auth>("login");

  const handleSelectChange = (select: Auth) => {
    setSelect(select);
  };

  return (
    <div
      style={{ background: `url(${mainImg})`, backgroundSize: "cover" }}
      className="flex items-center justify-end w-screen h-screen max-lg:justify-center"
    >
      <div className="flex flex-col border h-screen justify-center items-center bg-white w-1/4 max-lg:w-[50%]">
        <div className="flex justify-around w-full mt-10 p-5 border-t-2">
          <p
            className={`font-titleW cursor-pointer pb-1 ${select === "join" ? "border-b-2 border-black" : ""}`}
            onClick={() => handleSelectChange("join")}
          >
            회원 가입
          </p>
          <p
            className={`font-titleW cursor-pointer pb-1 ${select === "login" ? "border-b-2 border-black" : ""} `}
            onClick={() => handleSelectChange("login")}
          >
            로그인
          </p>
        </div>
        {select === "login" && <Login />}
        {select === "join" && <Join />}
      </div>
    </div>
  );
};

export default AuthPage;
