import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiRankingDuotone } from "react-icons/pi";
// import { useEffect, useRef } from "react";

const PAGES = [
  {
    name: "Home",
    link: "/",
    icon: <FaHome />,
  },
  {
    name: "MyPage",
    link: "/mypage",
    icon: <CgProfile />,
  },
  {
    name: "Rank",
    link: "/rank",
    icon: <PiRankingDuotone />,
  },
];

interface SidebarProps {
  isOpen: boolean;
  setSideOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setSideOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const sideRef = useRef<HTMLLIElement>(null);

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       isOpen &&
  //       sideRef.current &&
  //       !sideRef.current.contains(event.target as Node)
  //     ) {
  //       // 외부 클릭 되었을때
  //       setSideOpen(false);
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [isOpen, setSideOpen]);

  return (
    <div
      className={`max_950px:absolute max_950px:z-50 max_950px:top-0 
    max_950px:left-0 max_950px:w-full max_950px:h-screen 
    transition-all
    ${
      isOpen
        ? "max_950px:visible max_950px:bg-[rgba(0,0,0,0.8)]"
        : "max_950px:invisible max_950px:bg-[rgba(0, 0, 0, 0)]"
    }`}>
      <div
        className={`w-[300px] h-full bg-blue-100 min-h-screen relative 
      transition-transform duration-350 ease-in-out
      max_950px:absolute
      max_950px:z-10
      ${isOpen ? "max_950px:translate-x-0" : "max_950px:-translate-x-full"}`}>
        <div
          className="flex items-center mb-40 py-6 px-5
      font-titleFont font-titleW text-3xl tracking-[10px] cursor-pointer"
          onClick={() => navigate("/")}>
          Catch Mind
        </div>
        <ul>
          {PAGES.map((page) => (
            <li
              key={page.name}
              // ref={sideRef}
              onClick={() => setSideOpen(!isOpen)}
              className="w-full h-[60px] list-none flex items-center cursor-pointer">
              <NavLink
                to={page.link}
                className={`${
                  location.pathname === page.link ? "bg-blue-200" : ""
                } w-full h-full flex items-center pl-5`}>
                <span className="mr-[20px]">{page.icon}</span>
                <span>{page.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
