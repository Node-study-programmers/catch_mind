import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MainContainer from "../MainContainer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sideOpen, setSideOpen] = useState(false);
  return (
    <main className="w-full flex bg-blue-100">
      {/* 배경화면 */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBg})`, opacity: 0.5 }}></div> */}
      <Sidebar isOpen={sideOpen} setSideOpen={setSideOpen} />
      <div className="z-10 flex flex-col flex-1">
        <Header isOpen={sideOpen} setSideOpen={setSideOpen} />
        <MainContainer>{children}</MainContainer>
      </div>
    </main>
  );
};

export default Layout;
