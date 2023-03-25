import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './redux/store';

import App from './app';

const rootDiv = document.getElementById('root');

if (rootDiv != null) {
  const root = ReactDOM.createRoot(rootDiv);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
