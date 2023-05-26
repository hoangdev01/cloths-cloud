const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const PermissionController = require("../controller/PermissionController");
const role = require("../middleware/role");

router.get("/", PermissionController.index);

router.post("/", [verifyToken, role.admin], PermissionController.create);

router.put("/", [verifyToken, role.admin], PermissionController.update);

router.delete("/:id", [verifyToken, role.admin], PermissionController.destroy);

module.exports = router;
