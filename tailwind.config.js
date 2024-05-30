/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainText: "#333333",
        subText: "#666666",
        // login
        loginBtnBg: "#c3c3c3",
        loginBtnText: "#ffffff",
        kakao: "#FEE500", //카카오 배경색
        rankText: "#00738C",
        board: "#FFFFFF", //보드 배경색(화이트)
        subBoard: "#F2F2F2", //보드 위의 서브 보드(회색)
        //사이드바
        notActiveText: "#006B82",
        activeText: "#FFB800", //사이드바 테두리도 동일(주황)
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
    },
  },
  plugins: [],
};
