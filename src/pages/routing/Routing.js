import React from 'react'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../signup/Signup'
import Admin_dashboard from '../adminDashboard/Admin_dashboard'
import User_Dashboard from '../userDashboard/User_Dashboard'
import Navbar from '../../components/navbar/Navbar'

function AppRoutes() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin_dashboard />} />
        <Route path='/user' element={<User_Dashboard />} />
      </Routes>
    </div>
  )
}

function Routing() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default Routing
