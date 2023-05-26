const express = require("express");
const verifyToken = require("../middleware/verify-token");
const router = express.Router();
const upload = require("../middleware/upload");
const ResourceController = require("../controller/ResourceController");
const role = require("../middleware/role");
router.get("/avatar", ResourceController.avatarIndex);

router.post(
  "/avatar/user",
  verifyToken,
  upload.singleUpload.single("avatar"),
  ResourceController.createAvatarUser
);
router.post(
  "/avatar/event",
  [verifyToken, role.employee],
  upload.singleUpload.single("avatar"),
  ResourceController.createAvatarEvent
);

router.post(
  "/media",
  verifyToken,
  upload.multipleUpload,
  ResourceController.createMedia
);
router.delete("/delete/:id", ResourceController.destroy);

module.exports = router;
