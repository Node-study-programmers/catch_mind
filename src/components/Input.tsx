import React from "react";
import { InputType } from "../types";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  placeholder?: string;
  type: InputType;
}

const Input = ({ text, onChange, placeholder, type }: Props) => {
  if (type === "normal") {
    return (
      <div className="flex flex-col w-full">
        <div className="text-subText">{text}</div>
        <input
          placeholder={placeholder}
          className="border-2 rounded-lg focus:outline-none focus:border-yellow-300 p-3"
          onChange={onChange}
        />
      </div>
    );
  }

  if (type === "password") {
    return (
      <div className="flex flex-col w-full">
        <div className="text-subText">{text}</div>
        <input
          placeholder={placeholder}
          type="password"
          className="border-2 rounded-lg focus:outline-none focus:border-yellow-300 p-3"
          onChange={onChange}
        />
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="flex flex-col w-full">
        <div className="text-subText">{text}</div>
        <input
          placeholder={placeholder}
          className="border-2 rounded-r-full focus:outline-none focus:border-yellow-300 p-3"
          onChange={onChange}
        />
      </div>
    );
  }
};

export default Input;
