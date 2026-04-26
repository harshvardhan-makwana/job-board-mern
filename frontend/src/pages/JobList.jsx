import { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
        console.log('Data aaya:', data);
        setJobs(data);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center mt-10 text-xl">Loading jobs...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Jobs</h1>
      
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs posted yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{job.title}</h2>
              <p className="text-lg font-semibold text-gray-800">{job.company}</p>
              
              <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
                <span className="bg-gray-100 px-3 py-1 rounded-full">📍 {job.location}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">💼 {job.jobType}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">💰 {job.salary}</span>
              </div>
              
              <p className="mt-4 text-gray-700">{job.description?.substring(0, 120)}...</p>
              
              <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;