import { Room, RoomUsers, Rooms } from "../types";
import { httpClient } from "./http";

interface RoomParams {
  context?: string | null;
  currentPage: number;
  limit: number;
}

export const createRoom = async (data: { roomName: string }) => {
  const res = await httpClient.post<Room>("/home/createRoom", data);
  return res.data;
};

export const getRooms = async ({ context, currentPage, limit }: RoomParams) => {
  // 검색어 있을시
  if (context) {
    const res = await httpClient.get<Rooms>(
      `/home?searchName=${context}&page=${currentPage}&pageSize=${limit}`
    );

    return res.data;
  } else {
    const res = await httpClient.get<Rooms>(
      `/home?page=${currentPage}&pageSize=${limit}`
    );
    return res.data;
  }
};

export const joinRoom = async (data: { roomId: string }) => {
  const res = await httpClient.post<RoomUsers>("/home/enterRoom", data);

  return res.data;
};
