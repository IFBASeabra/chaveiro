import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home/index.tsx';
import Login from './pages/Login/index.tsx';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Home />} />
        <Route path="home" element ={<Home />} />
        <Route path="login" element ={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
