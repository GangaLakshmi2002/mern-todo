import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async() => {
     try {
        const response = await axios.get('http://localhost:8000/api/tasks', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setTasks(response.data.tasks);
     } catch (error) {
        console.log('error fetching tasks', error)  
     }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
          ))}
        </div>
      </div>
    );
}

export default TaskList