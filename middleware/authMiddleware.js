// Auth Middleware - Stub Function

const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    // 1. Get token from cookies
    const { token } = req.cookies;
    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ msg: "Not authorized, no token" });
    }
    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. IMPORTANT: Attach the user payload to the request object
    // Now controllers (getAllJobs, createJob, etc.) can access req.user
    req.user = {id:decoded.id,email:decoded.email};
    // 5. Token is valid, proceed to the next middleware/controller
    next();
  } catch (error) {
    // 6. CATCH BLOCK: Token is invalid (expired, wrong signature, etc.)
    console.error("Auth error:", error.message); // Log the error for debugging
    return res.status(401).json({ msg: "Not authorized, token failed" });
  }
};

module.exports = {
  checkAuth,
};
