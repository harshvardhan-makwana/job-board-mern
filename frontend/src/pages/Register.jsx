import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'  
import { setUser } from '../redux/authSlice'  
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from "../utils/api"

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker'
  });
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/register', formData)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      dispatch(setUser(data)); 
      
      toast.success('Account created successfully');
      navigate('/'); 
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again')
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Name"
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Email"
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password"
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <select 
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;