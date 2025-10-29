require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jobsRoutes = require("./routes/jobsRoutes");
const connectDB = require("./db/connect");

const app = express();

// Middleware
app.use(express.json());

// Mount routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobsRoutes);

// Basic root route
app.get("/", (req, res) => {
  res.send("Jobs API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error();
    
  }
}

start()