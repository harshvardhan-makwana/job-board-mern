import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import api from '../utils/api'

const MyApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state) => state.auth) 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}` 
          }
        }

        
        const res = await api.get('/api/applications/my', config)
        setApplications(res.data)
        setLoading(false)
      } catch (error) {
        ('Fetch error:', error)
        setLoading(false)
      }
    }

    if (user) { 
      fetchApplications()
    } else {
      setLoading(false)
    }
  }, [user])

  if (loading) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications ({applications.length})</h1>

      {applications.length === 0? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No applications yet</p>
          <a href="/jobs" className="bg-blue-600 text-white px-6 py-2 rounded">
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{app.job?.title}</h2>
              <p className="text-gray-600">{app.job?.company}</p>
              <p className="mt-2">Status: <span className="font-bold">{app.status}</span></p>
              <p>Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyApplications