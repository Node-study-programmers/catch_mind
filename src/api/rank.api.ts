import { RankUsers } from "../../types";
import { httpClient } from "./http";

export const fetchRank = async () => {
  const res = await httpClient.get<RankUsers>("/rank");
  return res.data;
};
