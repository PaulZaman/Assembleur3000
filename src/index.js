import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import './index.css';
import ISO from './ISO';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <ISO />
  </React.StrictMode>
);