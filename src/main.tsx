import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import AuthProvider from './providers/AuthProvider';

import Home from './pages/home';
import Login from './pages/login';
import UsersLayout from './pages/admin/users/layout';
import User from './pages/admin/users';
import NewUser from './pages/admin/users/new';
import AdminLayout from './pages/admin/layout';
import Admin from './pages/admin';
import Rooms from './pages/admin/rooms';
import NewRoom from './pages/admin/rooms/new';
import Layout from './pages/layout';

import './index.css'
import RoomsProvider from './providers/RoomsProvider';
import Room from './pages/room';
import ImportRooms from './pages/admin/rooms/import';
import RoomsLayout from './pages/admin/rooms/layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoomsProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route index path="home" element={<Home />} />
              <Route path="rooms/:id" element={<Room />} />
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path="users" element={<UsersLayout />}>
                  <Route index element={<User />} />
                  <Route path="new" element={<NewUser />} />
                </Route>
                <Route path="rooms" element={<RoomsLayout />}>
                  <Route index element={<Rooms />} />
                  <Route path="new" element={<NewRoom />} />
                  <Route path="import" element={<ImportRooms />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </RoomsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
