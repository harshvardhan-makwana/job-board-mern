import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import toast from 'react-hot-toast'

function MyJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (user.role !== 'employer') {
      toast.error('Only employers can access')
      navigate('/')
      return
    }
    fetchMyJobs()
  }, [user, navigate])

  const fetchMyJobs = async () => {
    try {
      const res = await api.get('/api/jobs/my-jobs')
      setJobs(res.data)
    } catch (error) {
      toast.error('Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
   
      try {
        await api.delete(`/api/jobs/${id}`)
        toast.success('Job deleted')
        setJobs(jobs.filter(job => job._id !== id))
      } catch (error) {
        toast.error('failed to delete')
      }
    
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          My Posted Jobs ({jobs.length})
        </h1>

        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-4">No jobs posted yet</p>
            <button
              onClick={() => navigate('/post-job')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                <p className="text-gray-700 font-semibold">{job.company}</p>
                <p className="text-gray-500 text-sm mt-2">📍 {job.location}</p>
                <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                {job.salary && (
                  <p className="text-green-600 font-semibold mt-2">💰 {job.salary}</p>
                )}

                <div className="mt-4 flex gap-2 justify-center">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyJobs