import axios from "axios";
import React from "react";

const Home = () => {
  axios
    .post("http://localhost:9999/auth/login", { email: "zxc@zxc.com", password: "aaaa" })
    .then(data => console.log(data));
  return <>hi</>;
};

export default Home;
