const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const role = require("../middleware/role");
const ServiceController = require("../controller/ServiceController");
const InstanceController = require("../controller/InstanceController");

router.get("/", ServiceController.index);

router.get(
  "/get-service-list/:service_code",
  ServiceController.showServiceList
);
router.get("/tag/:slug", ServiceController.showServiceFromTag);
router.get("/:slug", ServiceController.show);

router.post("/", [verifyToken, role.employee], ServiceController.create);

router.put("/", [verifyToken, role.employee], ServiceController.update);

router.delete("/:id", [verifyToken, role.employee], ServiceController.destroy);

//@Relationship
//@Rate
router.get("/rate/:id", ServiceController.getRate);

router.post("/rate", ServiceController.createRate);

router.get("/:id/instance", InstanceController.index);

router.get(":id/instance/:instanceId", InstanceController.show);

router.post("/:id/instance-single", InstanceController.create);

router.post("/:id/instance", InstanceController.createMultiple);

router.put("/:id/instance", InstanceController.update);

router.delete("/:id/instance", InstanceController.destroy);

module.exports = router;
