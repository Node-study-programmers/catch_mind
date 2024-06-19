import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";
import { InputErr } from "../types";

const Join = () => {
  const { setEmail, setNickname, setPassword, email, nickname, password, handleSignUp } = useAuth();
  const [inputErr, setInputErr] = useState<InputErr | null>(null);

  const isValidateValue = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    if (!emailRegex.test(email)) {
      setInputErr({ notValidType: "email", message: "유효하지 않은 이메일" });
      return true;
    }
    if (password.length < 3) {
      setInputErr({ notValidType: "password", message: "비밀번호가 너무 짧습니다" });
      return true;
    }

    if (nickname.length < 3) {
      setInputErr({ notValidType: "nickname", message: "닉네임이 너무 짧습니다" });
    }

    return false;
  };

  const handleClickLogin = () => {
    const isErr = isValidateValue();

    if (isErr) return;

    handleSignUp();
  };
  return (
    <>
      <div className="flex flex-[2] flex-col items-center justify-around w-full pl-5 pr-5">
        <div className="flex flex-col items-center">
          <div className="text-xl font-titleW">sign up</div>
          <div className="text-sm">Let's play catch mind!</div>
        </div>
        <div className="w-full">
          <Input type="normal" text="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          {inputErr?.notValidType === "email" && (
            <div className="flex justify-start text-red-600 text-xs">{inputErr.message}</div>
          )}
        </div>
        <div className="w-full">
          <Input type="password" text="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {inputErr?.notValidType === "password" && (
            <div className="flex justify-start text-red-600 text-xs">{inputErr.message}</div>
          )}
        </div>
        <div className="w-full">
          <Input type="normal" text="Your nick name" value={nickname} onChange={e => setNickname(e.target.value)} />
          {inputErr?.notValidType === "nickname" && (
            <div className="flex justify-start text-red-600 text-xs">{inputErr.message}</div>
          )}
        </div>
        <Button buttonStyle="auth" onClick={handleClickLogin}>
          Let's go!
        </Button>
      </div>
      <div className="flex-[1] flex items-center bg-subBoard w-full h-full justify-center"></div>
    </>
  );
};

export default Join;
