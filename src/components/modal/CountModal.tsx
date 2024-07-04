import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  countdown: number;
}

const CountModal = ({ countdown }: Props) => {
  return createPortal(
    <div className="fixed w-screen h-screen top-0 left-0 z-50 bg-[rgba(0,0,0,0.6)]">
      <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/3 rounded-3xl p-5 flex flex-col items-center">
        <div
          style={{ transform: "rotate(-5deg)", fontFamily: "Rubik Mono One" }}
          className="text-6xl text-white w-full text-center absolute -top-8 left-0">
          {countdown}
          <span className="absolute left-0 bottom-[-10px] w-full h-[2px] bg-white animate-underline"></span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CountModal;
