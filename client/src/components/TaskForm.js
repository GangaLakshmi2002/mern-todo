import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setassignedTo] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchUsers = async() => {
           try {
            const response = await axios.get('http://localhost:8000/api/users', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            setUsers(response.data)
           } catch (error) {
             console.log('error fetching users', error)
           }
        }
        fetchUsers();
    }, [])

    const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const response = await axios.post('http://localhost:8000/api/tasks', {title, description, assignedTo}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        }) ;
        toast.success(response.data.message)
        navigate('/dashboard')
       } catch (error) {
        console.log(error);
       }
    }
  return (
    <div className='max-w-md mx-auto mt-6 p-4 bg-gray-200 shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-4'>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} 
          required className='w-full p-2 mb-4 border border-gray-200 rounded-md'
        />
        <textarea placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} 
            className='w-full p-2 mb-4 border border-gray-200 rounded-md'
            />
        <select value={assignedTo} onChange={(e) => setassignedTo(e.target.value)  } className='w-full p-2 mb-6 border border-gray-200 rounded-md'>
            <option value="">Assign To</option>
            {
                users.map((user) => (
                    <option key={user._id} value={user._id}>{user.username}</option>
                ))
            }
        </select>
        <div className='flex justify-center'>
              <button type='submit' className='px-4 py-2 mb-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md cursor-pointer'>Add</button>
            </div>
      </form>
    </div>
  )
}

export default TaskForm