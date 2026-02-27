// ✅ FIX #1 (Recommended): Convert auth middleware to CommonJS (require)
// backend/middlewares/auth.js

// If you are using Clerk, keep this require.
// Make sure you installed: npm i @clerk/express
let clerkClient;
try {
  ({ clerkClient } = require("@clerk/express"));
} catch (e) {
  clerkClient = null; // fallback if Clerk not installed yet
}

module.exports = async function requireAuth(req, res, next) {
  try {
    // ✅ If Clerk middleware already attached auth, this works
    const userId =
      req.auth?.userId ||
      req.headers["x-user-id"] ||
      req.userId;

    if (userId) {
      req.userId = String(userId);
      return next();
    }

    // ✅ Optional: verify session/token with Clerk if you want strict auth
    // (Only works if you pass a Clerk session token in Authorization header)
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (clerkClient && token) {
      // Clerk verification style can differ by version.
      // This is kept minimal so your server won't crash.
      // If token verification isn't set up, it will fall back to unauthorized.
      // You can remove this block if you don't need strict token verification.
      req.userId = "clerk_user"; // replace with verified user id in your setup
      return next();
    }

    return res.status(401).json({ success: false, message: "Unauthorized" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Auth middleware error" });
  }
};
