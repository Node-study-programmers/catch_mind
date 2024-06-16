// component types
export type buttonTypes = "auth" | "kakao" | "side" | "submit";

export type InputType = "chat" | "normal" | "password" | "shadow";

// data types
export interface User {
  userId: string | null;
  nickName: string | null;
  imgUrl: string | null;
}
