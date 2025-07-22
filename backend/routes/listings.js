const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const isLoggedIn = require("../middleware/auth");
const multerconfig = require("../config/multerconfig");

// Index Route
router.get("/", listingController.index);

// Create Route
router.post("/", isLoggedIn, listingController.create);

// Show Route
router.get("/:id", listingController.show);

// Edit Route
router.get("/:id/edit", listingController.edit);

// Update Route
router.put("/:id", isLoggedIn, listingController.update);

// Delete Route
router.delete("/:id", isLoggedIn, listingController.deleteListing);

// Image routes
router.get("/:id/image", listingController.getImage);
router.post(
  "/:id",
  isLoggedIn,
  multerconfig.single("image"),
  listingController.uploadImage
);

module.exports = router;