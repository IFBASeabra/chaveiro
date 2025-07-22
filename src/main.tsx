import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import Home from './pages/home';
import Login from './pages/login';
import UsersLayout from './pages/admin/users/layout';
import User from './pages/admin/users';
import NewUser from './pages/admin/users/new';
import AdminLayout from './pages/admin/layout';
import Admin from './pages/admin';
import Layout from './pages/layout';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="users" element={<UsersLayout />}>
              <Route index element={<User />} />
              <Route path="new" element={<NewUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
