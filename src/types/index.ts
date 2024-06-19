// component types
export type buttonTypes = "auth" | "ingame" | "side" | "submit";

export type InputType = "chat" | "normal" | "password" | "shadow";

// data types
export interface User {
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  score: number | null;
}

export interface LoginOk {
  email: string;
  nickname: string;
  profileImage: string;
  score: number;
  token: string;
}

export interface InputErr {
  notValidType: "email" | "password" | "nickname";
  message: string;
}
