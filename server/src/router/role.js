const express = require("express");
const router = express.Router();
const role = require("../middleware/role");
const verifyToken = require("../middleware/verify-token");
const RoleController = require("../controller/RoleController");

router.get("/", RoleController.index);

router.post("/", [verifyToken, role.admin], RoleController.create);

router.put("/", [verifyToken, role.admin], RoleController.update);

router.delete("/:id", [verifyToken, role.admin], RoleController.destroy);

module.exports = router;
