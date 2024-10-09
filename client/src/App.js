import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
// import UserList from './components/UserList';
import EditTask from './components/EditTask';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 pb-2">
      <h1 className="text-4xl font-semibold text-center text-gray-100 bg-blue-400 p-2">TASKS APP</h1>
      <BrowserRouter>
        <Routes>
        <Route element={<Navigate to="login" />} path="/" />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path='/verify-email/:token' element={<VerifyEmail />} />
          <Route path='/create-task' element={<TaskForm />} />
          {/* <Route path='/users' element={<UserList />} /> */}
          <Route path='/edit-task/:id' element={<EditTask />} />

          
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
