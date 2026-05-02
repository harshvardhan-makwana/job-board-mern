import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import JobList from "./pages/JobList";
import Navbar from "./components/Navbar";
import JobDetails from "./pages/JobDetails";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import PostJob from "./pages/PostJob";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyJobs from "./pages/MyJobs";
import MyApplications from "./pages/MyApplications";
import MyApplicants from "./pages/MyApplicants";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/my-applicants" element={<MyApplicants />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
}

export default App;
