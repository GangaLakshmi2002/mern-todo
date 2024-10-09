import React, { useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const handleOnSubmit = async(e) => {
    e.preventDefault()
      try {
        const response = await axios.post('http://localhost:8000/api/auth/register', {username, email, password, role});
        window.location.replace("/login");
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className=' max-w-md mx-auto mt-6 p-4 shadow-md rounded-md  bg-white '>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>
        <form onSubmit={handleOnSubmit}>
           <input type='text' placeholder='username' value={username} 
            onChange={(e) => setUsername(e.target.value)} required  className='w-full p-2 mb-4 bg-gray-200 rounded-md' /> 
            <input type='email' placeholder='email' value={email} 
            onChange={(e) => setEmail(e.target.value)} required  className='w-full p-2 mb-4 bg-gray-200 rounded-md' /> 
            <input type='password' placeholder='password' value={password} 
            onChange={(e) => setPassword(e.target.value)} required  className='w-full p-2 mb-4 bg-gray-200 rounded-md' /> 
            <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 bg-gray-200 rounded-md'>
               <option value="user">User</option>
               <option value="admin">Admin</option>
            </select>
            <div className='flex justify-center'>
              <button type='submit' className='p-2 mb-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md cursor-pointer'>Submit</button>
            </div>
        </form>
        <div className='flex justify-end'>
        <p className='mt-2 pr-4 text-md'>Already have an account? <Link to={'/login'} className='text-blue-600 hover:text-blue-700'>Login</Link></p>
        </div>

        
    </div>
  )
}

export default Register