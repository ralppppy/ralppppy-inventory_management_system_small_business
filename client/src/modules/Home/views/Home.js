import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const value = useSelector((store) => store.Global.value);
  console.log(value);

  return <div>Home</div>;
}

export default Home;
