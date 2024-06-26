import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import rankImg from "../asset/img/ranking.png";
import Input from "./Input";
import { IoSearch } from "react-icons/io5";
import { userStore } from "../store/userStore";
import { TiRefresh } from "react-icons/ti";

interface MainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainer) => {
  const location = useLocation();
  const path = location.pathname;
  const [pageText, setPageText] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userStore(state => state.user);
  const [search, setSearch] = useState("");

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
  }, [path, user.nickname]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchParams.set("searchName", search);
    setSearchParams(searchParams);
  };

  return (
    <div
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
          {location.pathname === "/" && (
            <form className="flex items-center gap-5" onSubmit={handleSearch}>
              <TiRefresh
                className="text-5xl cursor-pointer"
                onClick={() => {
                  setSearch("");
                  searchParams.delete("searchName");
                  setSearchParams(searchParams);
                }}
              />
              <Input
                type="normal"
                placeholder="방 이름을 입력해주세요."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="rounded-xl border-blue-300 border-2 bg-blue-300 p-2 cursor-pointer" type="submit">
                <IoSearch className="text-3xl text-white" />
              </button>
            </form>
          )}
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
