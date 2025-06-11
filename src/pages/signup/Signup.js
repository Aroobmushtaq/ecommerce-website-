import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/slices/auth.slice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
  const [data, setData] = useState({ "fullName": "", "email": "", "password": "", "confirmPassword": "" ,"role":""})
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }
      if (data.password.length < 6) {
        toast.error("Password should be at least 6 characters long");
        return;
      }
      if (!data.email.includes('@')) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (data.fullName.length < 3) {
        toast.error("Username should be at least 3 characters long");
        return;
      }
      if (data.fullName.length > 15) {
        toast.error("Username should not exceed 15 characters");
        return;
      }

      const result = await dispatch(signup(data)).unwrap();
      toast.success("✅ Signup Successful");
      if (result?.role==="admin"){
        navigate("/admin")
      }else{
        navigate("/user")
      }
      console.log("User data:", result);
    } catch (error) {
      if (error === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("⚠️ This email is already registered. Please try logging in.");
      } else {
        toast.error("❌ Signup Failed: " + (error || "Something went wrong"));
      }
      console.log("Error in signup:", error);
    }

  };
  return (
    <div className='min-h-screen flex flex-col items-center justify-center  bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-lg w-full max-w-sm'>
        <h1 className='text-lg font-bold text-center mb-4'>Signup form</h1>
        <label className='block mb-2'>Full Name</label>
        <input className='bg-gray-50 border mb-3 w-full p-2 rounded' type='text' placeholder='Enter Name' value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} required />
        <label className='block mb-2'>Email</label>
        <input className='bg-gray-50 border mb-3 w-full p-2 rounded' type='email' placeholder='Enter Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
        <label className='block mb-2'>Password</label>
        <input className='bg-gray-50 border mb-3 w-full p-2 rounded' type='password' placeholder='Enter Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
        <label className='block mb-2'>Confirm Password</label>
        <input className=' bg-gray-50 border mb-3 w-full p-2 rounded' type='password' placeholder='Enter Confirm Password' value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required />
        <label className='block'>Role</label>
        <select 
        className="bg-gray-50 border mb-3 w-full p-2 rounded"
          value={data.role}
          onChange={(e)=>setData({...data,role:e.target.value})}
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className='bg-green-400 w-full mt-3 rounded p-2 text-white hover:bg-green-300'>Submit</button>
        <p className='text-center mt-3 '>Already have an account <Link to="/" className='text-blue-600'>Login Now</Link></p>
      </form>
    </div>
  )
}
