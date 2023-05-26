const express = require("express");
const router = express.Router();
const BillController = require("../controller/BillController");
const verifyToken = require("../middleware/verify-token");
const role = require("../middleware/role");

router.get("/", [verifyToken, role.employee], BillController.index);

router.get("/list-bill", [verifyToken], BillController.showUserBills);

router.get("/:id", [verifyToken], BillController.show);

router.post("/", [verifyToken], BillController.create);

router.put(
  "/confirm-bill",
  [verifyToken, role.employee],
  BillController.confirmBill
);

router.put("/cancel-bill", [verifyToken], BillController.cancelBill);

router.put("/restore-bill", [verifyToken], BillController.restoreBill);

router.delete("/:id", BillController.destroy);

module.exports = router;
