import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({task, fetchTasks}) => {
    const [user, setUser] = useState([])
    const handleDelete = async() => {
     try {
        await axios.delete(`http://localhost:8000/api/tasks/${task._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        fetchTasks();
      
     } catch (error) {
        console.log("not able to delete due to", error);
     }
    }
        
    // const handleEdit = () => {

    // }

  return (
    <div className='mb-2 p-4 bg-gray-100 rounded-md shadow-md '>
        <h3 className='text-lg font-bold mb-1'>Title : {task.title}</h3>
        <p className='mb-1 '>Description : <span className='text-gray-500'>{task.description}</span></p>
        <p className='mb-2 '>Assigned To : <span className='text-blue-500'>{task.assignedTo ? task.assignedTo.username : 'Usassigned'}</span></p>
        <p className='mb-1 '>Status : <span className='text-gray-500'>{task.status}</span></p>

        <button onClick={handleDelete} className='p-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600' >Delete</button>
        <button className='p-2 mt-2 ml-6 bg-green-500 text-white rounded-md hover:bg-green-600' ><Link to={`/edit-task/${task._id}`}>Edit</Link></button>

    </div>
  )
}

export default TaskItem