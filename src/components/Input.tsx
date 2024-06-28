import React from "react";
import { InputErr, InputType } from "../types";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  placeholder?: string;
  type: InputType;
  inputErr?: InputErr | null;
  onBlur?: () => void;
}

const Input = ({
  text,
  onChange,
  placeholder,
  type,
  disabled,
  value,
  inputErr,
  onBlur,
  ref,
}: Props) => {
  if (type === "normal") {
    return (
      <div className="flex flex-col w-full">
        <div className="text-subText">{text}</div>
        <input
          placeholder={placeholder}
          onBlur={onBlur}
          className={`${
            inputErr?.notValidType === "email" ? "border-red-100" : ""
          } border-2 rounded-lg focus:outline-none focus:border-yellow-300 p-3`}
          onChange={onChange}
          disabled={disabled}
          value={value}
        />
      </div>
    );
  }

  if (type === "shadow") {
    return (
      <div
        className="flex flex-col rounded-2xl w-[300px]"
        style={{
          boxShadow: "5px 5px 10px #99afcb,-5px -5px 10px #e5ffff",
        }}>
        <div className="text-subText">{text}</div>
        <input
          placeholder={placeholder}
          onBlur={onBlur}
          className="border-2 rounded-lg focus:outline-none focus:border-yellow-300 p-3"
          onChange={onChange}
          disabled={disabled}
          value={value}
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
          onBlur={onBlur}
          type="password"
          className="border-2 rounded-lg focus:outline-none focus:border-yellow-300 p-3"
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="flex w-full h-full">
        {/* <div className="text-subText">{text}</div> */}
        <input
          placeholder={placeholder}
          onBlur={onBlur}
          className="border-2 rounded-r-full focus:outline-none focus:border-yellow-300 p-3 w-full text-2xl"
          onChange={onChange}
        />
      </div>
    );
  }
};

export default Input;
