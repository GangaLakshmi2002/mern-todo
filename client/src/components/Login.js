import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleOnSubmit = async(e) => {
    e.preventDefault()
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', { email, password});
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        // console.log(response.data);
        toast.success(response.data.message);
        // window.location.replace("/dashboard")
        navigate('/dashboard')
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className=' max-w-md mx-auto mt-6 p-4 shadow-md rounded-md  bg-white '>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleOnSubmit}>
            <input type='email' placeholder='email' value={email} 
            onChange={(e) => setEmail(e.target.value)} required  className='w-full p-2 mb-4 bg-gray-200 rounded-md' /> 
            <input type='password' placeholder='password' value={password} 
            onChange={(e) => setPassword(e.target.value)} required  className='w-full p-2 mb-4 bg-gray-200 rounded-md' /> 
            <div className='flex justify-center'>
              <button type='submit' className='p-2 mb-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md cursor-pointer'>Submit</button>
            </div>
        </form>
        <div className='flex justify-end'>
        <p className='mt-2 mb-2 pr-4 text-md'> <Link to={'/forgot-password'} className='text-blue-600 hover:text-blue-700'>forgot-password ?</Link></p>

        </div>
        <div className='flex justify-end'>
        <p className='mt-2 pr-4 text-md'>Don't have an account? <Link to={'/register'} className='text-blue-600 hover:text-blue-700'>Register</Link></p>
        </div>
       

        
    </div>
  )
}

export default Login