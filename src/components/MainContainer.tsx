import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import rankImg from "../asset/img/ranking.png";
import Input from "./Input";
import { IoSearch } from "react-icons/io5";
import { userStore } from "../store/userStore";

interface MainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainer) => {
  const location = useLocation();
  const path = location.pathname;
  const [pageText, setPageText] = useState<string | null>(null);
  const user = userStore(state => state.user);

  useEffect(() => {
    function printPageText() {
      switch (path) {
        case "/":
          setPageText(`${user.nickname} 안녕하세요!`); //차후 유저 닉네임은 전역 상태 참조
          break;
        case "/rank":
          setPageText("Ranking");
          break;
        case "/mypage":
          setPageText("My Info");
          break;
        default:
          setPageText(null);
      }
    }
    printPageText();
  }, [path]);

  return (
    <div
      // style={{
      //   width: "calc(100vw - 300px)",
      //   height: "calc(100vh - 80px)",
      // }}
      className=" 
      h-[calc(100vh_-_80px)]
      min-w-[900px]
      max_950px:w-screen
      bg-blue-100
      "
    >
      {pageText && (
        <div
          className={`flex justify-between items-end w-full h-[15%] gap-4 px-10 pb-5 font-titleW text-xl bg-blue-100 ${
            path === "/rank" && "text-rankText"
          }`}
        >
          <div className="flex items-end">
            {pageText}
            {path === "/rank" && <img src={rankImg} className="w-12 h-12"></img>}
          </div>
          <div className="flex items-center gap-5">
            <Input type="normal" placeholder="방 이름을 입력해주세요." />
            <div className="rounded-xl border-blue-300 border-2 bg-blue-300 p-2 cursor-pointer">
              <IoSearch className="text-3xl text-white" />
            </div>
          </div>
        </div>
      )}
      <div
        className="h-[80%] bg-[#BFDBFE] overflow-y-auto mr-5 max_950px:ml-5 rounded-2xl max-h-full p-5 shadow-inner"
        style={{
          boxShadow: `inset 8px 8px 16px #97adc9, inset -8px -8px 16px #e7ffff`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
