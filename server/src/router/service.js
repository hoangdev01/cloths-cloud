const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const role = require("../middleware/role");
const ServiceController = require("../controller/ServiceController");

router.get("/", ServiceController.index);

router.get("/get-service-list/:service_code", ServiceController.showServiceList);
router.get("/tag/:slug", ServiceController.showServiceFromTag);
router.get("/:slug", ServiceController.show);

router.post("/", [verifyToken, role.employee], ServiceController.create);

router.put("/", [verifyToken, role.employee], ServiceController.update);

router.delete("/:id", [verifyToken, role.employee], ServiceController.destroy);

//@Relationship
//@Rate
router.get("/rate/:id", ServiceController.getRate);

router.post("/rate", ServiceController.createRate);

module.exports = router;
