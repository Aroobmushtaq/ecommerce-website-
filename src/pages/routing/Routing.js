import React from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../signup/Signup'
import Admin_dashboard from '../adminDashboard/Admin_dashboard'
import User_Dashboard from '../userDashboard/User_Dashboard'
function Routing() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin_dashboard/>}/>
        <Route path='/user' element={<User_Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routing
