import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";
import { InputErr } from "../types";
import AlertModal from "./modal/AlertModal";

const Login = () => {
  const { setEmail, setPassword, email, password, handleLogin } = useAuth();
  const [inputErr, setInputErr] = useState<InputErr | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setOpen(false);

  const isValidateValue = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    if (!emailRegex.test(email)) {
      setInputErr({ notValidType: "email", message: "유효하지 않은 이메일" });
      return true;
    }
    if (password.length < 3) {
      setInputErr({
        notValidType: "password",
        message: "비밀번호가 너무 짧습니다",
      });
      return true;
    }
    return false;
  };

  const handleClickLogin = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isErr = isValidateValue();

    if (isErr) return;

    handleLogin().catch(e => {
      setMessage(e.response.data.message);
      setOpen(true);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      handleClickLogin(e);
    }
  };

  return (
    <>
      <div className="flex flex-[3] flex-col items-center justify-around w-full pl-5 pr-5">
        <AlertModal open={open} handleClose={handleClose} message={message} />
        <div className="flex flex-col items-center">
          <div className="text-xl font-titleW">Login</div>
          <div className="text-sm">To access your account</div>
        </div>
        <form onSubmit={handleClickLogin} className="flex flex-col items-center justify-around w-full h-full">
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
          <Button buttonStyle="auth" type="submit" onKeyDown={handleKeyDown}>
            Log in
          </Button>
        </form>
      </div>
      <div className="flex-[1] flex items-center bg-subBoard w-full h-full justify-center"></div>
    </>
  );
};

export default Login;
