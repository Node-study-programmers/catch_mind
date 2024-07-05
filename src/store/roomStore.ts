import { create } from "zustand";
import { Room } from "../types";
import { persist, devtools } from "zustand/middleware";

export type CurrentRoom = Pick<Room, "masterNickname" | "roomId" | "roomStatus">;

interface Store {
  //스토어 타입들
  currentRoom: CurrentRoom;
  setRoom: (room: CurrentRoom) => void;
  removeRoom: () => void;
}

export const roomStore = create(
  devtools(
    persist<Store>(
      set => ({
        currentRoom: {
          masterNickname: null,
          roomId: null,
          roomStatus: null,
        },
        setRoom: (room: CurrentRoom) =>
          set({
            currentRoom: {
              masterNickname: room.masterNickname,
              roomId: room.roomId,
              roomStatus: room.roomStatus,
            },
          }),
        removeRoom: () =>
          set({
            currentRoom: {
              masterNickname: null,
              roomId: null,
              roomStatus: null,
            },
          }),
      }),
      { name: "roominfo" }
    )
  )
);
