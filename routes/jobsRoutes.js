const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController");
const { checkAuth } = require("../middleware/authMiddleware");

// All routes are protected with auth middleware
router.use(checkAuth);

// Jobs routes
router.route("/").get(getAllJobs).post(createJob);

router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
