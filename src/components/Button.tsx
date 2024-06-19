import React from "react";
import { buttonTypes } from "../types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonStyle: buttonTypes;
  active?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "button",
  buttonStyle,
}: ButtonProps) => {
  // if (buttonStyle === "kakao") {
  //   return (
  //     <button
  //       onClick={onClick}
  //       type={type}
  //       className="bg-kakao w-[250px] h-[55px] flex justify-center items-center cursor-pointer text-lg hover:opacity-80 rounded-md gap-8 px-1">
  //       <FaComment style={{ fontSize: "30px" }} />
  //       {children}
  //     </button>
  //   );
  // }
  if (buttonStyle === "auth") {
    return (
      <button
        className="bg-loginBtnBg text-loginBtnText w-[230px] h-[46px] rounded-full flex justify-center items-center cursor-pointer tracking-widest text-sm hover:opacity-80"
        onClick={onClick}
        type={type}>
        {children}
      </button>
    );
  }
  if (buttonStyle === "submit") {
    return (
      <button
        className="bg-loginBtnBg text-loginBtnText w-[100px] rounded-lg flex justify-center items-center cursor-pointer tracking-widest text-sm hover:opacity-80 text-nowrap"
        onClick={onClick}
        type={type}>
        {children}
      </button>
    );
  }

  // if (buttonStyle === "side") {
  //   return (
  //     <button
  //       className={`${
  //         active
  //           ? "text-activeText border-activeText"
  //           : "text-notActiveText border-notActiveText"
  //       } bg-white border-2 w-[230px] h-[50px] rounded-full lg:rounded-l-none flex justify-start items-center cursor-pointer tracking-widest text-md hover:opacity-80 font-titleW pl-3`}
  //       onClick={onClick}
  //       type={type}>
  //       {children}
  //     </button>
  //   );
  // }
};

export default Button;
