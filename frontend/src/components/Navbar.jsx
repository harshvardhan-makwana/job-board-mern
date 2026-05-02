import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const activeStyle = "bg-blue-700 px-3 py-2 rounded-lg font-semibold"
  const normalStyle = "hover:bg-blue-800 px-3 py-2 rounded-lg transition"

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">JobBoard</Link>
      
      <div className="flex gap-3 items-center">
        <NavLink 
          to="/jobs" 
          className={({ isActive }) => isActive ? activeStyle : normalStyle}
        >
          Browse Jobs
        </NavLink>

        {user ? (
          <>
            <span className="px-2">Hi, {user.name}</span>
            
            {user.role === 'employer' ? (
              <>
                <NavLink 
                  to="/post-job"
                  className={({ isActive }) => isActive ? activeStyle : normalStyle}
                >
                  + Post Job
                </NavLink>
                <NavLink 
                  to="/my-jobs"
                  className={({ isActive }) => isActive ? activeStyle : normalStyle}
                >
                  My Jobs
                </NavLink>
                <NavLink 
                  to="/my-applicants"
                  className={({ isActive }) => isActive ? activeStyle : normalStyle}
                >
                  My Applicants
                </NavLink>
              </>
            ) : (
             
              <NavLink 
                to="/my-applications"
                className={({ isActive }) => isActive ? activeStyle : normalStyle}
              >
                My Applications
              </NavLink>
            )}
            
            <NavLink 
              to="/profile"
              className={({ isActive }) => isActive ? activeStyle : normalStyle}
            >
              Profile
            </NavLink>
            
            <button 
              onClick={onLogout} 
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? activeStyle : normalStyle}
            >
              Login
            </NavLink>
            <NavLink 
              to="/register" 
              className={({ isActive }) => isActive ? activeStyle : normalStyle}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar