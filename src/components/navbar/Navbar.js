import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Navbar() {
 const user = useSelector(state => state.auth?.user)
console.log("user",user)
  return (
    <div>
      {
        user?.role==="admin"&&(
          <>
          <h1>Admin Panel</h1>
          <Link to="/admin/home">Home</Link>
          <Link to="/admin/products">Products</Link>
          </>
        )
      }
      {user?.role === 'user' && (
          <>
          <h1>User Dashboard</h1>
            <Link to="/user/home">Home</Link>
            <Link to="/user/about">About</Link>
            <Link to="/user/shop">Shop</Link>
          </>
        )}
    </div>
  )
}
