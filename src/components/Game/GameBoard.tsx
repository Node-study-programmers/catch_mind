import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import gameBoard from "../../asset/img/gameBoard.png";

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>();
  const [painting, setPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      setGetCtx(context);
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }, []);

  const drawFn = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (!painting) {
      getCtx!.beginPath();
      getCtx!.moveTo(mouseX, mouseY);
    } else {
      getCtx!.lineTo(mouseX, mouseY);
      getCtx!.stroke();
    }
  };

  return (
    <div className="h-full flex flex-col justify-around items-center w-1/2">
      <div className="bg-blue-300 h-[50px] flex items-center justify-center text-3xl w-[80%]">
        제시어 : 포도
      </div>
      {/* 게임 보드 */}
      <canvas
        className="w-full h-[70%] aspect-video mx-auto"
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => setPainting(false)}
        onMouseMove={(e) => drawFn(e)}
        onMouseLeave={() => setPainting(false)}
        ref={canvasRef}
        style={{
          background: `url(${gameBoard})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}></canvas>
      {/* <div className="flex justify-end ">
    <Button buttonStyle="submit">다 지우기</Button>
  </div> */}
      <div className="w-full grid grid-cols-2 h-[80px] gap-3">
        <div className="w-full border-2 rounded-l-full h-full bg-blue-300 flex justify-center items-center text-2xl">
          TIMER : 00:59
        </div>
        <Input type="chat" placeholder="정답을 입력하세요." />
      </div>
    </div>
  );
};

export default GameBoard;
