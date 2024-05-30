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
