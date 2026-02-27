// backend/routes/userRoutes.js
const router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const userController = require("../controllers/userController");

// public
router.get("/creations/public", userController.getPublicCreations);

// protected
router.get("/creations/me", requireAuth, userController.getMyCreations);
router.patch("/creations/:id/publish", requireAuth, userController.setPublishStatus);
router.post("/creations/:id/toggle-like", requireAuth, userController.toggleLike);

module.exports = router;
