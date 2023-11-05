const Listing = require("./models/listing");
const ExpressError = require("./utils/expressError.js");
const {reviewSchema} = require("./schema.js");
const {listingSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLogedin = (req,res,next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "User is not logged in");
      return res.redirect("/login");
    }

    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async(req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
      req.flash("error", "You don't have permission to edit!");
      return res.redirect(`/listings/${id}`);
    } 
    next();
}
module.exports.isReviewOwner = async(req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
    if (!review.owner._id.equals(res.locals.currentUser._id)) {
      req.flash("error", "You don't have permission to edit!");
      return res.redirect(`/listings/${id}`);
    } 
    next();
}

module.exports.validateReview = (req, res, next) => {
  let {err} = reviewSchema.validate(req.body);
  if (err) {
    throw new ExpressError(400, err)
  } else {
    next();
  }
}

module.exports.validateListing = (req, res, next) => {
  let {err} = listingSchema.validate(req.body);
  
  if (err) {
    throw new ExpressError(400, err);
  } else {
    next();
  }
}

