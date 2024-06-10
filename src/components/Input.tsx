import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  placeholder?: string;
  type: "chat" | "normal";
}

const Input = ({ text, onChange, placeholder, type }: Props) => {
  if (type === "normal") {
    return (
      <>
        <div className="flex flex-col">
          <div className="text-subText">{text}</div>
          <input
            placeholder={placeholder}
            className="border-2 rounded-lg w-[473px] h-[56px] focus:outline-none focus:border-yellow-300 p-3"
            onChange={onChange}
          />
        </div>
      </>
    );
  }

  if (type === "chat") {
    return (
      <>
        <div className="flex flex-col">
          <div className="text-subText">{text}</div>
          <input
            placeholder={placeholder}
            className="border-2 rounded-r-full w-[506px] h-[88px] focus:outline-none focus:border-yellow-300 p-3"
            onChange={onChange}
          />
        </div>
      </>
    );
  }
};

export default Input;
