import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import JobList from './pages/JobList'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar /> 
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home/>} />
      <Route path="/jobs" element={<JobList />} />
    </Routes>
    </>
  )
}

export default App