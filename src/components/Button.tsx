import React from "react";
import { FaComment } from "react-icons/fa6";
import { buttonTypes } from "../types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonStyle: buttonTypes;
  active?: boolean;
}

const Button = ({ children, onClick, type = "button", buttonStyle, active }: ButtonProps) => {
  if (buttonStyle === "kakao") {
    return (
      <button
        onClick={onClick}
        type={type}
        className="bg-kakao w-[250px] h-[55px] flex justify-center items-center cursor-pointer tracking-widest text-lg hover:opacity-80 rounded-md gap-8"
      >
        <FaComment />
        Login With KaKao
      </button>
    );
  }
  if (buttonStyle === "auth") {
    return (
      <button
        className="bg-loginBtnBg text-loginBtnText w-[230px] h-[46px] rounded-full flex justify-center items-center cursor-pointer tracking-widest text-sm hover:opacity-80"
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }

  if (buttonStyle === "side") {
    return (
      <button
        className={`bg-white ${
          active ? "text-activeText border-activeText" : "text-notActiveText border-notActiveText"
        } border-2 w-[230px] h-[50px] rounded-r-full flex justify-start items-center cursor-pointer tracking-widest text-md hover:opacity-80 font-titleW pl-3`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
};

export default Button;
