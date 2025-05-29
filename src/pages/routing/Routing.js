import React from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../signup/Signup'
function Routing() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routing
