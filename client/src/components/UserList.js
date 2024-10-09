// frontend/src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from './UserItem';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {users.map((user) => (
        <UserItem key={user._id} user={user} fetchUsers={fetchUsers} />
      ))}
    </div>
  );
};

export default UserList;
