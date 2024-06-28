// component types
export type buttonTypes = "auth" | "ingame" | "shadow" | "submit";

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

export interface Room {
  masterImage: string;
  masterNickname: string;
  roomId: string;
  roomMaxCount: number;
  roomName: string;
  roomUsersCount: number;
  roomStatus: "waiting" | "playing";
}

export interface Rooms {
  currentPage: number;
  roomData: Room[];
  totalPages: number;
}

export interface RankUsers {
  nickname: string;
  profileImage: string;
  score: number;
}

export interface RoomUser extends RankUsers {
  userId: string;
  isLeft: boolean;
  currentDraw: boolean;
}

export interface RoomUsers {
  roomUsers: RoomUser[];
}

export interface gameStatus {
  roomStatus: "waiting" | "playing";
}
