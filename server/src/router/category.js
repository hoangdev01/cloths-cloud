const express = require("express");
const verifyToken = require("../middleware/verify-token");
const CategoryController = require("../controller/CategoryController");
const router = express.Router();
const role = require("../middleware/role");

router.get("/", CategoryController.index);

router.post("/", [verifyToken, role.employee], CategoryController.create);

router.put("/", [verifyToken, role.employee], CategoryController.update);

router.delete("/:id", [verifyToken, role.employee], CategoryController.destroy);

module.exports = router;
