import { Dispatch, SetStateAction } from "react";
import Button from "../Button";

interface Props {
  handleChangeColor: (color: string) => void;
  handleClearBoard: () => void;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

const DrawController = ({ handleChangeColor, handleClearBoard, color, setColor }: Props) => {
  return (
    <div className="relative flex w-full justify-around items-center border-2 border-black bg-white rounded-r-full">
      <Button buttonStyle="color" colorValue="#000000" onClick={() => handleChangeColor("#000000")} />
      <Button buttonStyle="color" colorValue="#ff0000" onClick={() => handleChangeColor("#ff0000")} />
      <Button buttonStyle="color" colorValue="#bfff00" onClick={() => handleChangeColor("#bfff00")} />
      <Button buttonStyle="color" colorValue="#0000ff" onClick={() => handleChangeColor("#0000ff")} />
      <Button buttonStyle="color" colorValue="#f7e600" onClick={() => handleChangeColor("#f7e600")} />
      <div className="absolute top-[-35px] flex flex-row-reverse gap-3">
        <Button buttonStyle="shadow" onClick={handleClearBoard}>
          전체 지우기
        </Button>
        <input type="color" className="" value={color} onChange={e => setColor(e.target.value)} />
      </div>
    </div>
  );
};

export default DrawController;
