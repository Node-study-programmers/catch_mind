import React from "react";
import RankContainer from "../components/Rank/RankContainer";

//임시 데이터
const rankData = [
  { profileUrl: "https://picsum.photos/500/500", nickname: "골목대장", totalScore: 129 },
  { profileUrl: "https://picsum.photos/500/500", nickname: "쫄다구", totalScore: 80 },
  { profileUrl: "https://picsum.photos/500/500", nickname: "캐치마인드 신", totalScore: 54 },
  { profileUrl: "https://picsum.photos/500/500", nickname: "다 드루와", totalScore: 44 },
  { profileUrl: "https://picsum.photos/500/500", nickname: "그림쟁이", totalScore: 40 },
  { profileUrl: "https://picsum.photos/500/500", nickname: "몰라", totalScore: 21 },
  { profileUrl: "https://picsum.photos/500/500", nickname: "몰라2", totalScore: 20 },
];

const Rank = () => {
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
          {rankData.map((user, i) => (
            <RankContainer
              key={i}
              profileUrl={user.profileUrl}
              nickname={user.nickname}
              totalScore={user.totalScore}
              ranking={i + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rank;
