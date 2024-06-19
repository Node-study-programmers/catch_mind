import React from "react";
import { BiSolidCircle } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPage: number;
  };
}

const Pagination = ({ pagination }: PaginationProps) => {
  return (
    <div
      style={{ boxShadow: "5px 5px 9px #97adc9, -5px -5px 9px #e7ffff" }}
      className="bg-[#BFDBFE] w-[300px] rounded-xl h-[50px] flex justify-between items-center px-5">
      <MdArrowBackIos className="cursor-pointer fill-blue-400" />
      {Array.from({ length: pagination.totalPage }).map((_, index) => (
        <div key={index}>
          {pagination.currentPage === index + 1 ? (
            <BiSolidCircle className="fill-blue-500 rounded-full cursor-pointer" />
          ) : (
            <FaRegCircle className="text-xs fill-blue-400 cursor-pointer" />
          )}
        </div>
      ))}
      <MdArrowForwardIos className="cursor-pointer fill-blue-400" />
    </div>
  );
};

export default Pagination;
