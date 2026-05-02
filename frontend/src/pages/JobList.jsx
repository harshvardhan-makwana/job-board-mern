import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/api';

const JobList = () => {  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/api/jobs');
        ('Jobs from backend:', data); 
        setJobs(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

  return jobs.length === 0 ? (
    <p className="text-center text-gray-500 mt-10">No jobs posted yet</p>
  ) : (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white border rounded-lg p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">{job.title}</h2>
          <p className="text-lg font-semibold text-gray-800">{job.company}</p>
          
          <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-full">📍 {job.location}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">💼 {job.jobType}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">💰 {job.salary}</span>
          </div>

          <p className="mt-4 text-gray-700">{job.description?.substring(0, 120)}...</p>
          
          <Link to={`/job/${job._id}`}>
            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;