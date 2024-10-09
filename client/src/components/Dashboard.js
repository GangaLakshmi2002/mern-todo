import React from 'react'
import { Link } from 'react-router-dom'
import TaskList from './TaskList'

const Dashboard = () => {
  return (
    <div className='max-w-68xl mx-auto mt-6 p-6 shadow-md rounded-md bg-gray-200'>
        <h2 className='text-2xl font-bold mb-4 text-center items-center'>Dashboard</h2>
        <button className=' justify-end mb-4 bg-blue-500 p-2 mr-9  text-white hover:bg-blue-600 rounded-md'><Link to={"/create-task"}>Create Task</Link></button>
        {/* <button className=' justify-end mb-4 bg-blue-500 p-2  text-white hover:bg-blue-600 rounded-md'><Link to={"/users"}>users</Link></button> */}

        <TaskList />

    </div>
  )
}

export default Dashboard