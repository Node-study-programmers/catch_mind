import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="flex justify-between items-center w-full px-10">
      <div
        className="font-titleFont font-titleW text-5xl tracking-[20px] cursor-pointer"
        onClick={() => navigate("/")}>
        Catch Mind
      </div>
      <div className="font-titleFont font-titleW text-2xl tracking-widest relative p-2 rounded-full ">
        <FaPowerOff
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {isHovered && (
          <div className="absolute top-full right-0 mt-2 bg-white p-2 border rounded shadow font-mainFont text-sm">
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
