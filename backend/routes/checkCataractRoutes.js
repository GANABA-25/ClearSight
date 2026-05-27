const express = require("express");
const { uploadImage } = require("../middleware/multer");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

const checkCataractController = require("../controller/checkCataractController");

router.post(
  "/scanImage",
  isAuthenticated,
  uploadImage,
  checkCataractController.scanImage
);

router.post(
  "/scanHistory",
  isAuthenticated,
  checkCataractController.scanHistory
);

router.get(
  "/getScanHistory",
  isAuthenticated,
  checkCataractController.getScanHistory
);

module.exports = router;
