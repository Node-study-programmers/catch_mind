import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const AuthPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <Input type="normal" text="Email address" />
      <Button buttonStyle="auth">Log in</Button>
      <Button buttonStyle="kakao" />
      <Button buttonStyle="side" active>
        main
      </Button>
      <Button buttonStyle="side">rank</Button>
    </div>
  );
};

export default AuthPage;
