import React, { useEffect, useState } from "react";
import RankContainer from "../components/Rank/RankContainer";
import { RankUsers } from "../types";
import { fetchRank } from "../api/rank.api";

//임시 데이터

const Rank = () => {
  const [rankData, setRankData] = useState<RankUsers>([]);

  useEffect(() => {
    fetchRank()
      .then((data) => setRankData(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="overflow-auto max-h-full">
      <table className="w-full">
        <thead className="grid grid-cols-4 w-full">
          <th className="text-center">순위</th>
          <th className="text-center">프로필</th>
          <th className="text-center">닉네임</th>
          <th className="text-center">총점수</th>
        </thead>
        <tbody className="flex flex-col gap-2">
          {rankData.length === 0 && (
            <div className="w-full text-center mt-20 font-titleW">
              랭킹에 이름을 올려보세요!
            </div>
          )}
          {rankData.map((user, i) => (
            <RankContainer
              key={i}
              profileUrl={user.profileImage}
              nickname={user.nickname}
              totalScore={user.score}
              ranking={i + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rank;
