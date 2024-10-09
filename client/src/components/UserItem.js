import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserItem = ({user, fetchUsers}) => {
    const handleDelete = async() => {
     try {
        await axios.delete(`http://localhost:8000/api/users/${user._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        fetchUsers();
      
     } catch (error) {
        console.log("not able to delete due to", error);
     }
    }
    const handleEdit = () => {

    }
        
   

  return (
    <div className='mb-2 p-4 bg-gray-100 rounded-md shadow-md '>
      {console.log("users", user)}
        <h3 className='text-lg font-bold mb-1'>UserName : {user.username}</h3>
        <p className='mb-1'>Email : {user.email}</p>
        <p className='mb-2 '>Role : <span className='text-blue-500'>{user.role ? user.role : 'Unassigned'}</span></p>
        <button onClick={handleDelete} className='p-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600' >Delete</button>
        <button onClick={handleEdit} className='p-2 mt-2 ml-6 bg-green-500 text-white rounded-md hover:bg-green-600' >Edit</button>

    </div>
  )
}

export default UserItem