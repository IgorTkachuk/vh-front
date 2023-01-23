import React from 'react';
import { Component1 } from './components/Component1';
import './style.scss';
import './app.css';

const App: React.FC = () => {
  const a = 1234567;

  return (
    <>
      <div className="red">Hello world! {a}</div>
      <h1 className="text-primary text-4xl font-bold">Hello world again!</h1>
      <Component1 />
    </>
  );
};

export default App;
