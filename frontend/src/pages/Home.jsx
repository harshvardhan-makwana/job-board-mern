import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
      .then((res) => {
        setJobs(res.data.slice(0, 3)); // Sirf first 3 jobs
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-xl mb-8">Thousands of jobs from top companies</p>
        <Link
          to="/jobs"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100"
        >
          Browse All Jobs
        </Link>
      </div>

      {/* Latest Jobs */}
      <div className="max-w-5xl mx-auto p-6 mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Jobs</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border rounded-lg p-5 shadow-md"
              >
                <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                <p className="text-gray-800 font-semibold">{job.company}</p>
                <p className="text-gray-600 mt-2">📍 {job.location}</p>
                <p className="text-green-600 font-bold mt-1">💰 {job.salary}</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View All Jobs →
          </Link>
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center py-6 mt-20">
        <p>© 2026 JobBoard. Made with ❤️ by Harshvardhan</p>
      </footer>
    </div>
  );
};

export default Home;
