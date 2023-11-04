const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(`${id}`);
    let newReview = new Review(req.body.review);
    newReview.owner = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added Successfuly!")
    res.redirect(`/listings/${id}`);
  
}

module.exports.destroyReview = async(req,res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted Successfuly!")
    res.redirect(`/listings/${id}`);
  }