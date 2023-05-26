const express = require("express");
const router = express.Router();
const role = require("../middleware/role");
const verifyToken = require("../middleware/verify-token");
const EventController = require("../controller/EventController");

router.get("/", EventController.index);

router.post("/", [verifyToken, role.employee], EventController.create);

router.put("/", [verifyToken, role.employee], EventController.update);

router.delete("/:id", [verifyToken, role.employee], EventController.destroy);

module.exports = router;
