import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../store/slices/auth.slice' // adjust path if needed

export default function Navbar() {
  const user = useSelector(state => state.auth?.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to homepage or login page
  }

  return (
    <div className='bg-gray-800 p-4 text-white shadow-md'>
      {
        user?.role === "admin" && (
          <div className='container mx-auto flex items-center justify-between '>
            <h1 className='text-xl font-bold'>Admin Panel</h1>
            <div className="flex items-center gap-4">
              <Link to="/admin/home" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Home</Link>
              <Link to="/admin/products" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Products</Link>
              <Link to="/admin/order" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Orders</Link>
              <Link to="/admin/message" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Messages</Link>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition">
                Logout
              </button>
            </div>
          </div>
        )
      }

      {user?.role === 'user' && (
        <div className='container mx-auto flex items-center justify-between '>
          <h1 className='text-xl font-bold'>User Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link to="/user/" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Home</Link>
            <Link to="/user/cart" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Cart</Link>
            <Link to="/user/search" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Search</Link>
            <Link to="/user/message" className='hover:bg-gray-700 px-3 py-2 rounded-md transition'>Message</Link>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
