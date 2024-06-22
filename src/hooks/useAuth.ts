import { useState } from "react";
import { userStore } from "../store/userStore";
import { login, signUp } from "../api/auth.api";

export const useAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const setUser = userStore((state) => state.setUser);

  const handleLogin = async () => {
    return login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setUser({
          email: data.email,
          nickname: data.nickname,
          profileImage: `${import.meta.env.VITE_IMG_URL}${data.profileImage}`,
          score: data.score,
        });
        // alert(`${data.nickname} 안녕하세요!`); //알럿창 수정 필요(디자인)
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };

  const handleSignUp = async () => {
    return signUp({ email, password, nickname })
      .then(() => {
        alert("회원가입 성공"); //알럿창 수정 필요(디자인)
        handleLogin(); //회원가입 성공시 바로 로그인후 홈으로 리다이렉트
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };

  return {
    handleLogin,
    handleSignUp,
    email,
    password,
    nickname,
    setEmail,
    setNickname,
    setPassword,
  };
};
