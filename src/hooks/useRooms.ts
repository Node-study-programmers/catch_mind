import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getRooms } from "../api/room.api";

export const useRooms = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: roomsData, isLoading: isRoomsLoading } = useQuery(
    ["rooms", location.search],
    () =>
      getRooms({
        context: params.get("searchName") ? params.get("searchName") : "",
        currentPage: params.get("page") ? Number(params.get("page")) : 1,
        limit: 4,
      })
  );

  const currentPage: number = roomsData?.currentPage || 1;
  const totalPage: number = roomsData?.totalPages || 0;

  return {
    roomsData: roomsData?.roomData,
    isRoomsLoading,
    pagination: {
      currentPage: currentPage,
      totalPage: totalPage,
    },
  };
};
