import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import rankImg from "../asset/img/ranking.png";

interface MainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainer) => {
  const location = useLocation();
  const path = location.pathname;

  function printPageText() {
    switch (path) {
      case "/":
        return `${"홍길동님"} 안녕하세요!`; //차후 유저 닉네임은 전역 상태 참조
      case "/rank":
        return "Ranking";
      default:
        return null;
    }
  }

  return (
    <div className="rounded-3xl bg-[#e6e6e6] relative flex flex-col justify-center items-center w-full mr-10 h-full">
      <div className="hidden lg:absolute bg-white w-[80px] h-[80px] rounded-full top-24 -left-10"></div>
      {printPageText() && (
        <div
          className={`flex justify-start items-center w-full gap-4 pl-10 h-[10%] font-titleW ${
            path === "/rank" && "text-rankText"
          }`}>
          {printPageText()}
          {path === "/rank" && <img src={rankImg} className="h-full"></img>}
        </div>
      )}
      <div
        className="w-[95%] h-[90%] bg-[#e6e6e6]"
        style={{
          borderRadius: "20px",
          boxShadow: `inset 12px 12px 20px #adadad, inset -12px -12px 20px #ffffff`,
        }}>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
