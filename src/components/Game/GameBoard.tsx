import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Input from "../Input";
import gameBoard from "../../asset/img/gameBoard.png";
import { DrawPosition } from "../../types";

interface Props {
  emitDraw: () => void;
  setDrawPosition: Dispatch<SetStateAction<DrawPosition>>;
  drawPosition: DrawPosition;
}

const GameBoard = ({ emitDraw, setDrawPosition, drawPosition }: Props) => {
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
  );
};

export default GameBoard;
