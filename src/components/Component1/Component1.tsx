import React, { FC } from 'react';

import s from './style.module.scss';

const Component1: FC = () => {
  console.log('.env REACT_APP_TEST value is ', process.env.REACT_APP_TEST);

  return <div className={s.navy}>Component</div>;
};

export default Component1;
