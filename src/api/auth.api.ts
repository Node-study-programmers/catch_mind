import { LoginOk } from "../../types";
import { httpClient } from "./http";

interface AuthProps {
  email: string;
  password: string;
  nickname: string;
}

export const login = async (data: Omit<AuthProps, "nickname">) => {
  const res = await httpClient.post<LoginOk>("/auth/login", data);
  return res.data;
};

export const signUp = async (data: AuthProps) => {
  const res = await httpClient.post("/auth/join", data);
  return res.data;
};
