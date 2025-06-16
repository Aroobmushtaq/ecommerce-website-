import React from 'react'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../signup/Signup'
import Navbar from '../../components/navbar/Navbar'
import AdminProducts from '../adminDashboard/AdminProducts'
import CartPage from '../userDashboard/UserCart'
import UserHome from '../userDashboard/UserHome'
import OrderSuccess from '../userDashboard/OrderSuccess'
import SearchPage from '../userDashboard/SearchPage'
import CheckoutPage from '../userDashboard/CheckOutPage'
import SendMessage from '../userDashboard/SendMessage'
import AdminMessages from '../adminDashboard/AdminMessage'
import AdminOrdersPage from '../adminDashboard/AdminOrderPage'
import AdminHome from '../adminDashboard/AdminHome'
function AppRoutes() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/signup'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route path='/user/' element={<UserHome />} />
        <Route path='/user/checkout' element={<CheckoutPage />} />
        <Route path='/user/success' element={<OrderSuccess />} />
        <Route path='/user/search' element={< SearchPage/>} />
        <Route path='/user/message' element={<SendMessage />} />
        <Route path='/user/cart' element={<CartPage />} />
        <Route path='/admin/message' element={< AdminMessages/>} />
        <Route path='/admin/order' element={< AdminOrdersPage/>} />
        <Route path='/admin' element={< AdminHome/>} />
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
