# Job Board MERN 🚀

Full-stack Job Board application where employers can post jobs and job seekers can apply. Built with MERN stack + JWT Authentication + Role-based Access Control.

## ✨ Live Demo
Coming Soon - Deploy on Vercel + Render

## 🛠️ Tech Stack

**Frontend:**
- React.js + Vite
- Redux Toolkit for State Management  
- React Router DOM v6
- Axios with Interceptors
- Tailwind CSS

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcryptjs for Auth
- CORS, dotenv

**Tools:** Nodemon, Thunder Client, Git, GitHub


## 📅 14 Day Development Journey

| Day | Status | Work Done |
| --- | --- | --- |
| **Day 1** | ✅ | Project Setup, MongoDB Connection, Basic Express Server |
| **Day 2** | ✅ | User Model + Auth APIs: Register/Login with Password Hashing |
| **Day 3** | ✅ | JWT Implementation, Auth Middleware, Role-Based Access |
| **Day 4** | ✅ | Job Model + CRUD APIs: Create, Read, Update, Delete Jobs |
| **Day 5** | ✅ | Owner Protection: Only job creator can update/delete |
| **Day 6** | ✅ | React + Vite Setup, Tailwind Integration, Project Structure |
| **Day 7** | ✅ | Redux Toolkit: Auth Slice, Store Config, Protected Routes |
| **Day 8** | ✅ | Core UI: Home Page, Job Listing Page, Navbar, Responsive Design |
| **Day 9** | ✅ | Employer Features: My Jobs Page, Post Job Form, Delete Job |
| **Day 10** | ✅ | Application Model + Apply Job API for Jobseekers |
| **Day 11** | ✅ | Applicants Modal: View all applicants for specific job |
| **Day 12** | ✅ | Status Update API: Shortlist/Reject Applicants with UI refresh |
| **Day 13** | ✅ | Major Debugging: Fixed 404/401 errors using Axios Instance |
| **Day 14** | ✅ | UI Polish, Toast Notifications, GitHub Push, Documentation |

## ✅ Features Implemented

**Backend - Day 1-5:**
- **User Authentication:** Register/Login with JWT + Password Hashing
- **Role-Based Access:** Separate roles for `jobseeker` and `employer`
- **Job CRUD:** Employers can Create, Read, Update, and Delete job postings
- **Protected Routes:** Middleware to protect routes and verify user roles
- **Owner Protection:** Only the employer who created a job can update/delete it

**Frontend - Day 6-14:**
- **React + Vite Setup:** Modern frontend with hot reload
- **Tailwind CSS Integration:** Professional UI styling
- **Redux State Management:** Centralized auth and jobs state
- **API Connection:** Axios instance with JWT token interceptor
- **Job Listing Page:** `/jobs` route with dynamic job cards
- **Employer Dashboard:** `My Jobs` page with Posted by You section
- **Applicants Management:** View applicants modal + Status update
- **Responsive Design:** Mobile + Desktop friendly layout
- **Environment Variables:** `VITE_API_URL` for secure API calls
- **CORS Fixed:** Frontend-backend communication working

## 🎨 UI Highlights

| Page | Features |
| --- | --- |
| **Home** | Hero banner, Browse All Jobs CTA, Latest 3 jobs section |
| **Jobs** | Grid layout, Job cards with Title, Company, Location, Salary |
| **My Jobs** | Employer only: Posted jobs + View Applicants + Delete button |
| **Navbar** | Dynamic links based on role: Home, Jobs, Login, Register, Logout |
| **Applicants Modal** | List of applicants with Email, Skills + Shortlist/Reject buttons |

## 🐛 Key Bugs Solved
1. **404 Not Found:** Fixed incorrect API routes `/api/applications/:id` vs `/api/applications/apply/:id`
2. **401 Unauthorized:** Solved by using centralized `api.js` instance instead of direct `axios` calls
3. **CORS Error:** Handled with `cors()` middleware and proper Vite proxy setup
4. **Token Not Sending:** Created Axios interceptor to auto-attach JWT on every request

## ⚙️ Setup Locally

### 1. Clone the repo
```bash
git clone https://github.com/harshvardhan-makwana/job-board-mern.git
cd job-board-mern