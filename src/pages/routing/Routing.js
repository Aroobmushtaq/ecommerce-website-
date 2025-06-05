import React from 'react'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../signup/Signup'
import Navbar from '../../components/navbar/Navbar'
import AdminProducts from '../adminDashboard/AdminProducts'

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
        <Route path='/admin/products' element={<AdminProducts />} />
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
