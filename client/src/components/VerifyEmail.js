import axios from 'axios'
import React from 'react';
import { useParams } from 'react-router-dom';

const VerifyEmail = async() => {
    const { token } = useParams();
    try {
        console.log("token", token);
        const response = await axios.get(`http://localhost:8000/api/auth/verify-email/${token}`);
        window.location.replace("/");
        
    } catch (error) {
       console.log(error); 
    }
  return (
    <>
    </>
  )
}

export default VerifyEmail