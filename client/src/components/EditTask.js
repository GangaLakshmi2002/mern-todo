import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';


const EditTask = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setassignedTo] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // const history = useHistory();

    useEffect(() => {
        const fetchTask = async() => {
            try {
                const res = await axios.get(`http://localhost:8000/api/tasks/${id}`);
                const task = res.data;
                
                setTitle(task.title);
                setDescription(task.description);
                setassignedTo(task.assignedTo);
                setStatus(task.status)
                console.log("task",task);
               
            } catch (error) {
                console.log(error)
            }
        };

        fetchTask();
    }, [id]);

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            
            await axios.put(`http://localhost:8000/api/tasks/${id}`,  
                {title, description, assignedTo, status }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                
            });
            navigate('/dashboard');
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='max-w-md mx-auto mt-6 p-4 bg-slate-200 shadow-md rounded-md'>
        <h2 className='text-2xl font-bold mb-4'>Edit Task</h2>
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
        <select value={status} onChange={(e) => setStatus(e.target.value)  } className='w-full p-2 mb-6 border border-gray-200 rounded-md'>
            {
                
                <>
            <option value="">Status</option>

                <option value='pending'>Pending</option>
                <option value='in-progress'>In-Progress</option>
                <option value='completed'>Completed</option></>
                
               
            }
        </select>
        
           <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded-md'>
            Update
           </button>


        </form>
    </div>
  )
}

export default EditTask;