import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './style.scss';
import './app.css';
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth/RequireAuth';
import { Component1 } from './components/Component1';
import ObjectList from './pages/ObjectList/ObjectList';
import ObjectUpload from './pages/ObjectUpload/ObjectUpload';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          {/* protected routes */}
          <Route path="component" element={<Component1 />} />
          <Route path="objlist" element={<ObjectList pn="03336166" />} />
          <Route path="objupload" element={<ObjectUpload />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
