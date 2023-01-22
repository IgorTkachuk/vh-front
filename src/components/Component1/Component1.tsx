import React from "react";
import { FC } from "react";

import s from "./style.module.scss";

const Component1: FC = () => {
  console.log(s);
  return <div className={s.navy}>Component</div>;
};

export default Component1;
