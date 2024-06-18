import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { signUp } from "./api/auth.api";
import { useAuth } from "../hooks/useAuth";

const Join = () => {
  const { setEmail, setNickname, setPassword, email, nickname, password, handleSignUp } = useAuth();
  return (
    <>
      <div className="flex flex-[2] flex-col items-center justify-around w-full pl-5 pr-5">
        <div className="flex flex-col items-center">
          <div className="text-xl font-titleW">sign up</div>
          <div className="text-sm">Let's play catch mind!</div>
        </div>
        <Input type="normal" text="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" text="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Input type="normal" text="Your nick name" value={nickname} onChange={e => setNickname(e.target.value)} />
        <Button buttonStyle="auth" onClick={handleSignUp}>
          Let's go!
        </Button>
      </div>
      <div className="flex-[1] flex items-center bg-subBoard w-full h-full justify-center">
        <Button buttonStyle="kakao">Signup With KaKao</Button>
      </div>
    </>
  );
};

export default Join;
