import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Browse from './pages/browse.tsx';
import Welcome from './pages/welcome.tsx';
import Login from './pages/login.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <div id="top-bar">
      <a href="/">PennKudos</a>
      <a href="login">Login</a>
      <a href="browse">Browse</a>
    </div>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/browse" element={<Browse/>}/>
      </Routes>
    </Router>
  </>
);
