import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import api from "../utils/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await api.get(`/api/jobs/${id}`);
      setJob(res.data);
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) return toast.error("Please Login First");
    if (!user.token) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await api.post(
        `/api/applications/${id}`,
        { resume: "https://drive.google.com/dummy-resume.pdf" },
      );
      if (res.status === 201) toast.success("Applied Successfully 🎉");
    } catch (error) {
      if (error.response?.status === 400)
        toast.error("Already applied to this job");
      else if (error.response?.status === 403)
        toast.error("Employer cannot apply to job");
      else toast.error("Error: " + error.message);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 my-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>

      <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
        <span className="flex items-center gap-1">{job.company}</span>
        <span className="flex items-center gap-1">{job.location}</span>
        <span className="flex items-center gap-1">{job.jobType}</span>
        <span className="flex items-center gap-1">{job.salary}</span>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">Job Description</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

        <h2 className="text-xl font-semibold mb-3">Requirements</h2>
        {Array.isArray(job.requirements) && job.requirements.length > 0 ? (
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No specific requirements listed.</p>
        )}
      </div>

      {user?.role === "jobseeker" && (
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Apply Now
        </button>
      )}

      {user?.role === "employer" && user?._id === job.postedBy && (
        <div className="bg-gray-100 text-gray-600 px-6 py-2 rounded">
          This is your job posting
        </div>
      )}
    </div>
  );
};

export default JobDetails;
