import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../utils/api'
import toast from 'react-hot-toast'

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/admin/users')
      setUsers(res.data)
    } catch (error) {
      toast.error('Failed to fetch users. Please refresh the Page.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Pakka ${name} ko delete karna hai?`)) {
      try {
        await api.delete(`/api/admin/users/${id}`)
        toast.success('User deleted')
        setUsers(users.filter(u => u._id !== id)) 
      } catch (error) {
        toast.error('Failed to delete user. Please Try Again')
      }
    }
  }


  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex justify-center items-center h-96">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
            <h1 className="text-3xl font-bold text-white text-center">
              All Users <span className="text-blue-200">({filteredUsers.length})</span>
            </h1>
          </div>

           
          <div className="p-6 bg-gray-50 border-b">
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Role</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Joined</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        u.role === 'admin' ? 'bg-red-100 text-red-700' :
                        u.role === 'employer' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDelete(u._id, u.name)}
                        disabled={u._id === user._id} 
                        className="text-red-500 hover:text-red-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard