import React from "react";
import Input from "./Input";
import Button from "./Button";

const Login = () => {
  return (
    <>
      <div className="flex flex-[2] flex-col items-center justify-around w-full pl-5 pr-5">
        <div className="flex flex-col items-center">
          <div className="text-xl font-titleW">Login</div>
          <div className="text-sm">To access your account</div>
        </div>
        <Input type="normal" text="Email address" />
        <Input type="password" text="Password" />
        <Button buttonStyle="auth">Log in</Button>
      </div>
      <div className="flex-[1] flex items-center bg-subBoard w-full h-full justify-center">
        <Button buttonStyle="kakao">Login With KaKao</Button>
      </div>
    </>
  );
};

export default Login;
