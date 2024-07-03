import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Input from "../Input";
import gameBoard from "../../asset/img/gameBoard.png";
import { DrawPosition } from "../../types";
import { currentRoomInfoType } from "../../hooks/useSocket";
import { userStore } from "../../store/userStore";

interface Props {
  emitDraw: () => void;
  setDrawPosition: Dispatch<SetStateAction<DrawPosition>>;
  drawPosition: DrawPosition;
  currentRoomInfo: currentRoomInfoType | undefined;
}

const GameBoard = ({ emitDraw, setDrawPosition, drawPosition, currentRoomInfo }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>();
  const [painting, setPainting] = useState(false);
  const user = userStore(state => state.user);

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

    if (painting && currentRoomInfo && currentRoomInfo.nickname === user.nickname) {
      setDrawPosition({ x: mouseX, y: mouseY });
      emitDraw();
      getCtx!.lineTo(mouseX, mouseY);
      getCtx!.stroke();
    } else {
      getCtx!.beginPath();
    }

    if (currentRoomInfo && currentRoomInfo.nickname !== user.nickname) {
      console.log(drawPosition);
      getCtx!.lineTo(drawPosition.x, drawPosition.y);
      getCtx!.stroke();
    }
  };

  return (
    <canvas
      className="w-full h-[70%] aspect-video mx-auto"
      onMouseDown={() => setPainting(true)}
      onMouseUp={() => setPainting(false)}
      onMouseMove={e => drawFn(e)}
      onMouseLeave={() => setPainting(false)}
      ref={canvasRef}
      style={{
        background: `url(${gameBoard})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></canvas>
  );
};

export default GameBoard;
