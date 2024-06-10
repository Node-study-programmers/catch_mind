import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      className="bg-loginBtnBg text-loginBtnText w-[270px] h-[56px] rounded-full flex justify-center items-center cursor-pointer tracking-widest text-lg hover:opacity-80"
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
