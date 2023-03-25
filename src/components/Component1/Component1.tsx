import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

const Component1: FC = () => {
  // console.log('.env REACT_APP_TEST value is ', process.env.REACT_APP_TEST);

  return (
    <div className={s.navy}>
      Component<Link to="/objlist">Object list</Link>
    </div>
  );
};

export default Component1;
