import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/auth.slice'
import toast from 'react-hot-toast'
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: "", password: "" })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(data))
    if (!result.payload) {
      toast.error("Invalid email or password")
      return
    }
    if (result.payload?.role === "admin") {
      navigate("/admin")
    } else if(result.payload?.role === "user"){
      navigate("/user")
    }else {
      toast.error("Login failed. Please check your credentials.");
    }
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded w-full max-w-sm'>
        <h1 className='text-center font-bold text-lg mb-4'>Login form</h1>
        <label className='block mb-2' >Email</label>
        <input type='text' name='email' placeholder='Enter Email' value={data.email} onChange={handleChange} className='bg-gray-50 border rounded w-full p-2 mb-3' required />
        <label className='block mb-2'>Password</label>
        <input type='password' name='password' placeholder='Enter Password' value={data.password} onChange={handleChange} className='bg-gray-50 border rounded w-full p-2 mb-3' required />
        <button className='bg-green-400 w-full mt-3 rounded p-2 text-white hover:bg-green-300'>Login</button>
        <p className='text-center mt-3'>Don't have an account <Link to="/signup" className='text-blue-600'>Signup Now </Link></p>
      </form>
    </div>

  )
}
