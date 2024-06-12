import React from "react";
import Input from "./Input";
import Button from "./Button";

const Join = () => {
  return (
    <>
      <div className="flex flex-[2] flex-col items-center justify-around w-full pl-5 pr-5">
        <div className="flex flex-col items-center">
          <div className="text-xl">sign up</div>
          <div className="text-sm">Let's play catch mind!</div>
        </div>
        <Input type="normal" text="Email address" />
        <Input type="password" text="Password" />
        <Input type="normal" text="Your nick name" />
        <Button buttonStyle="auth">Let's go!</Button>
      </div>
      <div className="flex-[1] flex items-center bg-subBoard w-full h-full justify-center">
        <Button buttonStyle="kakao" />
      </div>
    </>
  );
};

export default Join;
