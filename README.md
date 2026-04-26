# MERN Job Board Portal 💼

A full-stack Job Portal built with the MERN stack where Employers can post jobs and Jobseekers can browse and apply to them.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT (JSON Web Tokens), bcryptjs
- **Tools:** Nodemon, Thunder Client, Git

## Features Implemented [Day 1-5]

- **User Authentication:** Register/Login with JWT + Password Hashing
- **Role-Based Access:** Separate roles for `jobseeker` and `employer`
- **Job CRUD:** Employers can Create, Read, Update, and Delete job postings
- **Protected Routes:** Middleware to protect routes and verify user roles
- **Owner Protection:** Only the employer who created a job can update/delete it

## 🚀 Features Implemented [Day 6-8] - Frontend

- **React + Vite Setup** - Modern frontend with hot reload
- **Tailwind CSS Integration** - Professional UI styling
- **API Connection** - Axios to fetch jobs from Express backend
- **Job Listing Page** - `/jobs` route with dynamic job cards
- **Home Page UI** - Hero section + Latest 3 jobs display
- **Responsive Design** - Mobile + Desktop friendly layout
- **Environment Variables** - `VITE_API_URL` for secure API calls
- **CORS Fixed** - Frontend-backend communication working on port 8000

## 📸 UI Highlights

| Page       | Features                                                     |
| ---------- | ------------------------------------------------------------ |
| **Home**   | Hero banner, "Browse All Jobs" CTA, Latest jobs section      |
| **Jobs**   | Grid layout, Job cards with Title, Company, Location, Salary |
| **Navbar** | Links to Home, Jobs, Login, Register                         |

## API Endpoints

| Method   | Endpoint             | Access        | Description             |
| -------- | -------------------- | ------------- | ----------------------- |
| `POST`   | `/api/auth/register` | Public        | Register a new user     |
| `POST`   | `/api/auth/login`    | Public        | Login and get JWT token |
| `POST`   | `/api/jobs`          | Employer Only | Create a new job        |
| `GET`    | `/api/jobs`          | Public        | Get all job listings    |
| `GET`    | `/api/jobs/:id`      | Public        | Get single job by ID    |
| `PUT`    | `/api/jobs/:id`      | Owner Only    | Update a job            |
| `DELETE` | `/api/jobs/:id`      | Owner Only    | Delete a job            |

## How To Run Locally

1. Clone the repo: `git clone https://github.com/harshvardhan-makwana/job-board-mern.git`
2. Go to backend folder: `cd job-board-mern/backend`
3. Install dependencies: `npm install`
4. Create `.env` file and add: `MONGO_URI=your_mongodb_url` and `JWT_SECRET=your_secret`
5. Run the server: `npm run dev`
6. Server runs on `http://localhost:8000`

### Frontend Setup

1. Go to frontend: `cd ../frontend`
2. Install dependencies: `npm install`
3. Create `.env` file: `VITE_API_URL=http://localhost:8000/api`
4. Run app: `npm run dev`
5. Visit `http://localhost:5173`

## Future Roadmap

- [ ] Application Model - Jobseekers can apply to jobs
- [ ] Employer Dashboard - View all applicants for a job
- [x] Frontend with React
- [ ] Search and Filter Jobs
- [ ] Resume Upload with Cloudinary

## 📅 Updated Progress

| Day         | Status | Work Done                                             |
| ----------- | ------ | ----------------------------------------------------- |
| **Day 1-5** | ✅     | Backend API, Auth, JWT, Job CRUD, Protected Routes    |
| **Day 6-7** | ✅     | React setup, Tailwind, Component structure            |
| **Day 8**   | ✅     | Frontend + Backend Integration, JobList UI, Home Page |

## Author

Harshvardhan Makwana
