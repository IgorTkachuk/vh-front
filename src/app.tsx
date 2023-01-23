import React from "react";
import { Component1 } from "./components/Component1";
import "./style.scss";

const App: React.FC = () => {
  let a: number;
  a = 123456;

  return (
    <>
      <div className="red">Hello world! {a}</div>
      <Component1 />
    </>
  );
};

export default App;
