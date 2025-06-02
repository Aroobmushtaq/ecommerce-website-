import React from 'react'
import { Link } from 'react-router-dom'
export default function Login() {
  const handleSubmit=()=>{
    
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded w-full max-w-sm'>
      <h1 className='text-center font-bold text-lg mb-4'>Login form</h1>
      <label className='block mb-2' >Email</label>
      <input type='text' placeholder='Enter Email' className='border rounded w-full p-2 mb-3' />
       <label  className='block mb-2'>Password</label>
      <input type='password' placeholder='Enter Password' className='border rounded w-full p-2 mb-3' />
      <button className='bg-green-400 w-full mt-3 rounded p-2 text-white hover:bg-green-300'>Login</button>
      <p className='text-center mt-3'>Dont have an account <Link to="/signup" className='text-blue-600'>Signup</Link></p>
      </form>
    </div>
    
  )
}
