import { Room, Rooms } from "../../types";
import { httpClient } from "./http";

export const createRoom = async (data: { roomName: string }) => {
  const res = await httpClient.post<Room>("/home/createRoom", data);
  return res.data;
};

export const getRooms = async (currentPage?: number, limit?: number) => {
  if (currentPage && limit) {
    const res = await httpClient.get<Rooms>(`/home?page=${currentPage}&pageSize=${limit}`);
    return res.data;
  }

  const res = await httpClient.get<Rooms>(`/home`);
  return res.data;
};

export const joinRoom = async (data: { roomId: string }) => {
  const res = await httpClient.post("/home/enterRoom", data);
  return res.data;
};
