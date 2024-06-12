import React from "react";

interface MainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainer) => {
  return (
    <div className="rounded-3xl bg-white relative flex justify-center items-center w-full mr-10 h-full">
      <div className="hidden lg:absolute bg-white w-[80px] h-[80px] rounded-full top-24 -left-10"></div>
      <div className="w-[90%] h-[90%] bg-subBoard">{children}</div>
    </div>
  );
};

export default MainContainer;
