import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import gameBoard from "../../asset/img/gameBoard.png";
import { DrawPosition } from "../../types";
import { currentRoomInfoType } from "../../hooks/useSocket";
import { userStore } from "../../store/userStore";
import canvas from "../../asset/img/cursor.png";

interface Props {
  emitDraw: (
    x: number,
    y: number,
    stopDraw: boolean,
    color: string,
    erase: boolean
  ) => void;
  drawPosition: DrawPosition | undefined;
  currentRoomInfo: currentRoomInfoType | undefined;
  setGetCtx: Dispatch<
    SetStateAction<CanvasRenderingContext2D | null | undefined>
  >;
  getCtx: CanvasRenderingContext2D | null | undefined;
  handleClearBoard: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  color: string;
}

const GameBoard = ({
  emitDraw,
  drawPosition,
  currentRoomInfo,
  setGetCtx,
  getCtx,
  handleClearBoard,
  canvasRef,
  color,
}: Props) => {
  const [painting, setPainting] = useState(false);
  const user = userStore((state) => state.user);

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (
      painting &&
      currentRoomInfo &&
      currentRoomInfo.nickname === user.nickname &&
      canvasRef.current
    ) {
      //소켓으로 X,Y 좌표 데이터 보낼때 비율로 보냄
      const x = mouseX / canvasRef.current.width;
      const y = mouseY / canvasRef.current.height;

      emitDraw(x, y, false, color, false);
      setPainting(false);
      getCtx?.beginPath();
    }
  };

  const handleMouseDown = () => {
    if (currentRoomInfo && currentRoomInfo.nickname === user.nickname) {
      setPainting(true);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      setGetCtx(context);
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }, []);

  //그림 그리는 다른 사람이 마우스를 땟을떄
  useEffect(() => {
    if (drawPosition && drawPosition.stopDraw) {
      getCtx?.beginPath();
    }
  }, [drawPosition?.stopDraw]);

  //다른 사람이 그린 그림 내 화면에 그리기
  useEffect(() => {
    if (
      !painting &&
      currentRoomInfo &&
      currentRoomInfo.nickname !== user.nickname &&
      getCtx &&
      drawPosition &&
      canvasRef.current &&
      drawPosition.x &&
      drawPosition.y
    ) {
      //소켓으로 받은 X,Y 좌표 데이터를 현재 canvas 비율만큼 계산후 그리기
      const adjustedX = drawPosition.x * canvasRef.current.width;
      const adjustedY = drawPosition.y * canvasRef.current.height;

      getCtx.strokeStyle = drawPosition.color;
      getCtx.lineTo(adjustedX, adjustedY);
      getCtx.stroke();
    }
  }, [drawPosition]);

  //턴이 바뀌면 그림 그렸던거 초기화
  useEffect(() => {
    handleClearBoard();
  }, [currentRoomInfo]);

  //그림 그리는 사람이 지우기 했을때
  useEffect(() => {
    if (
      drawPosition &&
      drawPosition.erase &&
      currentRoomInfo &&
      currentRoomInfo.nickname !== user.nickname
    ) {
      handleClearBoard();
    }
  }, [drawPosition?.erase]);

  const drawFn = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    if (
      painting &&
      currentRoomInfo &&
      currentRoomInfo.nickname === user.nickname &&
      canvasRef.current &&
      getCtx
    ) {
      //소켓으로 X,Y 좌표 데이터 보낼때 비율로 보냄
      const x = mouseX / canvasRef.current.width;
      const y = mouseY / canvasRef.current.height;
      console.log(color);
      emitDraw(x, y, true, color, false);
      getCtx.strokeStyle = color;
      getCtx.lineTo(mouseX, mouseY);
      getCtx.stroke();
    }
  };

  return (
    <canvas
      className="w-full h-[70%] aspect-video mx-auto relative"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => drawFn(e)}
      onMouseLeave={() => setPainting(false)}
      ref={canvasRef}
      style={{
        cursor: `url(${canvas})`,
        background: `url(${gameBoard})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}></canvas>
  );
};

export default GameBoard;
