import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MainContainer from "../MainContainer";
import mainBg from "../../asset/img/mainBackground.png";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative w-full my-0 mx-auto h-screen max-h-screen max-w-screen">
      {/* 배경화면 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBg})`, opacity: 0.5 }}
      ></div>

      <div className="relative z-10 flex flex-col py-10 gap-10 h-full">
        <Header />
        <div className="flex flex-col gap-5 px-10 lg:px-0 lg:flex-row lg:gap-48 h-full overflow-y-hidden">
          <Sidebar />
          <MainContainer>{children}</MainContainer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
