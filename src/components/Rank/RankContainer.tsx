import React from "react";

interface Props {
  profileUrl: string;
  nickname: string;
  totalScore: number;
  ranking: number;
}

const RankContainer = ({
  profileUrl,
  nickname,
  totalScore,
  ranking,
}: Props) => {
  return (
    //각각 1의 비율로 정렬
    <tr className="grid grid-cols-4 items-center justify-center bg-white border rounded-2xl">
      <td className="text-center p-2">{ranking}</td>
      <td className="flex justify-center p-2">
        <img
          src={profileUrl}
          alt=""
          className="h-20 w-20 object-cover rounded-full"
        />
      </td>
      <td className="text-center p-2">{nickname}</td>
      <td className="text-center p-2 font-titleW text-2xl underline">
        {totalScore}
      </td>
    </tr>
  );
};

export default RankContainer;
