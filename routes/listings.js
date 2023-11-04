const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {validateListing} = require("../middleware.js");
const {isLogedin, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLogedin, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));


router.get("/new", isLogedin, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put( isLogedin, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLogedin, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLogedin, isOwner, validateListing, wrapAsync(listingController.editListingForm));


module.exports = router;