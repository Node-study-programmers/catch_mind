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
  if (buttonStyle === "ingame") {
    return (
      <button
        onClick={onClick}
        type={type}
        className="font-titleW text-white bg-blue-400 w-[250px] h-[55px] flex justify-center items-center cursor-pointer text-lg hover:opacity-80 rounded-2xl ">
        {children}
      </button>
    );
  }
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

  if (buttonStyle === "shadow") {
    return (
      <button
        style={{
          boxShadow: "5px 5px 10px #99afcb, -5px -5px 10px #e5ffff",
        }}
        className="bg-blue-400 text-loginBtnText w-[100px] rounded-lg flex justify-center items-center cursor-pointer tracking-widest text-sm hover:opacity-80 text-nowrap"
        onClick={onClick}
        type={type}>
        {children}
      </button>
    );
  }
};

export default Button;
