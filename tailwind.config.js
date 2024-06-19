/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('/assets/img/mainBackground.png')",
      },
      colors: {
        mainText: "#333333",
        subText: "#666666",
        // login
        loginBtnBg: "#c3c3c3",
        loginBtnText: "#ffffff",
        kakao: "#FEE500", //카카오 배경색
        rankText: "#00738C",
        board: "#FFFFFF", //보드 배경색(화이트)
        subBoard: "whitesmoke", //보드 위의 서브 보드(회색)
        //사이드바
        notActiveText: "#00738C",
        activeText: "#FFB800", //사이드바 테두리도 동일(주황)

        // 방 컨테이너
        roomContainer: " ",
        roomBoxshadow: "",
        roomTitle: "",
        roomContent: "",

        // 인게임
        userContainer: "#E2F2FD",
        timerContainer: "#E2F2FD",
        timerText: "black",
        timerEmergency: "red",
        inGame: "#ff5454",
        waitingGame: "#91f74f",
      },
      fontFamily: {
        titleFont: ["Schoolbell", "sans-serif"],
        mainFont: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        thinW: 300,
        mainW: 400,
        titleW: 700,
      },
      screens: {
        max_950px: { max: "1020px" }, // Custom breakpoint
      },
    },
  },
  plugins: [],
};
