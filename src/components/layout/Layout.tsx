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
    <div className="relative w-screen h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBg})`, opacity: 0.5 }}></div>
      <div className="relative z-10 flex flex-col h-full mr-24 flex-shrink-0">
        <Header />
        <div className="flex flex-col lg:flex-row h-[90%] lg:gap-56 ml-24 lg:ml-0">
          <Sidebar />
          <MainContainer>{children}</MainContainer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
