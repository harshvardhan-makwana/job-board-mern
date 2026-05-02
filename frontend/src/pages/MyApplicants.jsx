import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../utils/api'

function MyApplicants() {
  const [jobs, setJobs] = useState([])
  const [applicants, setApplicants] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const { data } = await api.get(`/api/jobs/my-jobs`)
        setJobs(data)
      } catch (error) {
        toast.error('Failed to fetch')
      }
    }
    if (user?.role === 'employer') fetchMyJobs()
  }, [user])

  const fetchApplicants = async (jobId, jobTitle) => {
    try {
      setLoading(true)
      const { data } = await api.get(`/api/applications/${jobId}`)
      setApplicants(data)
      setSelectedJob({ id: jobId, title: jobTitle })
    } catch (error) {
      toast.error('Failed to applicants fetch')
    } finally {
      setLoading(false)
    }
  }

  
  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await api.put(`/api/applications/${appId}`, { status: newStatus })
      toast.success(`Application ${newStatus}`)
      fetchApplicants(selectedJob.id, selectedJob.title) 
    } catch (error) {
      toast.error('Status update failed')
    }
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">
        {selectedJob? `Applicants for ${selectedJob.title}` : 'Your Posted Jobs'}
      </h2>

      
      {!selectedJob? (
        <div className="grid gap-4">
          {jobs.length === 0? <p>No jobs posted yet</p> : jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <button
                onClick={() => fetchApplicants(job._id, job.title)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                View Applicants
              </button>
            </div>
          ))}
        </div>
      ) : (
        
        <div className='text-center'>
          <button
            onClick={() => setSelectedJob(null)}
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            ← Back to Jobs
          </button>

          {loading? <p>Loading...</p> : applicants.length === 0? (
            <p>No applicants yet for this job</p>
          ) : (
            <div className="grid gap-4 text-center">
              {applicants.map((app) => (
                <div key={app._id} className="border p-4 rounded">
                  <p><b>Name:</b> {app.applicant.name}</p>
                  <p><b>Email:</b> {app.applicant.email}</p>
                  <p><b>Applied:</b> {new Date(app.createdAt).toLocaleDateString()}</p>
                  <p>
                    <b>Status:</b>
                    <span className={
                      app.status === 'pending'? 'text-yellow-500' :
                      app.status === 'shortlisted'? 'text-green-500' : 'text-red-500'
                    }> {app.status}</span>
                  </p>
                  <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View Resume
                  </a>

                  {app.status === 'pending' && (
                    <div className="mt-3 flex gap-2 justify-center">
                      <button
                        onClick={() => handleUpdateStatus(app._id, "shortlisted")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-bold"
                      >
                        ✅ Shortlist
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MyApplicants
  