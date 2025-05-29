import React from 'react'
import { useState } from 'react'
export default function Signup() {
  const [data,setData]=useState({"fullName":"","email":"","password":"","confirmPassword":""})
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(data)
    setData({"fullName":"","email":"","password":"","confirmPassword":""})
  }
  return (
    <div>
      <h1>Signup form</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type='text' placeholder='Enter Name' value={data.fullName} onChange={(e)=>setData({...data,fullName:e.target.value})} required/>
        <label>Email</label>
        <input type='email' placeholder='Enter Email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} required/>
        <label>Password</label>
        <input type='password' placeholder='Enter Password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} required/>
        <label>Confirm Password</label>
        <input type='password' placeholder='Enter Confirm Password' value={data.confirmPassword} onChange={(e)=>setData({...data,confirmPassword:e.target.value})} required/>
        <button>Submit</button>
      </form>
    </div>
  )
}
