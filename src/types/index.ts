export type buttonTypes = "auth" | "kakao" | "side";

export interface User {
  userId: string | null;
  nickName: string | null;
  imgUrl: string | null;
}

export type InputType = "chat" | "normal" | "password";
