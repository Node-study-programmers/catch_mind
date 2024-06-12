import React from "react";

interface MainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainer) => {
  return (
    <div className="h-[90%] mt-3 lg:mt-16 rounded-3xl bg-white relative min-w-[75%] flex justify-center items-center">
      <div className="absolute bg-white w-[80px] h-[80px] rounded-full top-24 -left-10"></div>
      <div className="w-[90%] h-[90%] bg-subBoard">{children}</div>
    </div>
  );
};

export default MainContainer;
