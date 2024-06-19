import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  isOpen: boolean;
  setSideOpen: (isOpen: boolean) => void;
}

const Header = ({ isOpen, setSideOpen }: HeaderProps) => {
  return (
    <div className="w-full h-[80px] flex items-center bg-blue-100 px-7 justify-between">
      <div className="invisible max_950px:visible max_950px:basis-[5%] max_950px:mt-[8px] max_950px:mr-[10px]">
        <FiMenu
          onClick={() => setSideOpen(!isOpen)}
          className="text-2xl cursor-pointer"
        />
      </div>
      <div
        className="font-titleFont font-titleW 
        text-xl tracking-widest flex gap-3 cursor-pointer p-2 hover:bg-blue-300 transition-all">
        LOGOUT
      </div>
    </div>
  );
};

export default Header;
