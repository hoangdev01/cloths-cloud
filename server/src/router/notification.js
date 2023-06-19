const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const NotificationController = require("../controller/NotificationController");

router.get("/", verifyToken, NotificationController.index);

router.get("/:id", verifyToken, NotificationController.show);

router.put("/:id", verifyToken, NotificationController.update);

module.exports = router;
