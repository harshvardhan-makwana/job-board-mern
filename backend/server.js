const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require('./routes/applicationRoutes'); 
const connectDB = require("./config/db");
const adminRoutes= require("./routes/adminRoutes.js");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
 origin: [
    'http://localhost:5173', 
    'https://job-board-mern-inky.vercel.app'
  ],
  credentials: true  // Enable cookies for jwt auth
}))
app.use(express.json()); // parse JSON request bodies
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  (`server is listening on port ${PORT}`);
});
