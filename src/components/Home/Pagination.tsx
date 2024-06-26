import React from "react";
import { BiSolidCircle } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPage: number;
  };
}

const Pagination = ({ pagination }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, totalPage } = pagination;

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <div
      style={{ boxShadow: "5px 5px 9px #97adc9, -5px -5px 9px #e7ffff" }}
      className="bg-[#BFDBFE] w-[300px] rounded-xl h-[50px] flex justify-between items-center px-5"
    >
      <MdArrowBackIos
        className={` fill-blue-400 ${currentPage === 1 ? "opacity-0" : "fill-blue-200 cursor-pointer"}`}
        onClick={() => {
          if (currentPage > 1) {
            handleClickPage(currentPage - 1);
          }
        }}
      />
      {Array.from({ length: totalPage }).map((_, index) => (
        <div key={index} onClick={() => handleClickPage(index + 1)}>
          {pagination.currentPage === index + 1 ? (
            <BiSolidCircle className="fill-blue-500 rounded-full cursor-pointer" />
          ) : (
            <FaRegCircle className="text-xs fill-blue-400 cursor-pointer" />
          )}
        </div>
      ))}
      <MdArrowForwardIos
        className={`fill-blue-400 ${currentPage === totalPage ? "opacity-0" : "fill-blue-200 cursor-pointer"}`}
        onClick={() => {
          if (currentPage < totalPage) {
            handleClickPage(currentPage + 1);
          }
        }}
      />
    </div>
  );
};

export default Pagination;
