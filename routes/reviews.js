const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLogedin, isReviewOwner} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

router.post("/",isLogedin, validateReview, wrapAsync(reviewController.createReview));
router.delete("/:reviewId",isLogedin, isReviewOwner, wrapAsync(reviewController.destroyReview));
  

module.exports = router