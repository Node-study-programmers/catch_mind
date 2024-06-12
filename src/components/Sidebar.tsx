import React from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

const PAGES = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "MyPage",
    link: "/mypage",
  },
  {
    name: "Rank",
    link: "/rank",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (link: string) => {
    navigate(link);
  };
  return (
    <div className="flex lg:flex-col justify-center lg:justify-start gap-5 lg:mt-36">
      {PAGES.map((page) => (
        <Button
          key={page.name}
          active={location.pathname === page.link}
          buttonStyle="side"
          onClick={() => handleNavigate(page.link)}>
          {page.name}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
