// backend/routes/promptRoutes.js
const router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const promptController = require("../controllers/promptController");

// public
router.get("/public", promptController.listPublic);

// protected
router.get("/me", requireAuth, promptController.listMine);
router.post("/", requireAuth, promptController.create);
router.put("/:id", requireAuth, promptController.update);
router.delete("/:id", requireAuth, promptController.remove);

module.exports = router;
