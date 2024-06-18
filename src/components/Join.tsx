import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { signUp } from "./api/auth.api";

const Join = () => {
  const handleSignUp = () => {
    signUp({ email: "zxc1@zxc.com", password: "aaaa", nickname: "테스트" })
      .then(() => alert("성공"))
      .catch(e => {
        console.log(e);
        alert("초비상");
      });
  };
  return (
    <>
      <div className="flex flex-[2] flex-col items-center justify-around w-full pl-5 pr-5">
        <div className="flex flex-col items-center">
          <div className="text-xl font-titleW">sign up</div>
          <div className="text-sm">Let's play catch mind!</div>
        </div>
        <Input type="normal" text="Email address" />
        <Input type="password" text="Password" />
        <Input type="normal" text="Your nick name" />
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
