const Listing = require("../models/listing.js");
const ExpressError = require("../utils/expressError.js");


module.exports.index =  async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate: {path: "owner"}}).populate("owner");
    if (!listing) {
      req.flash("error", "List does not exits!");
      res.redirect("/listings");
    } else {
      res.render("listings/show.ejs", { listing });
    }
}

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New List added successfuly!")
    res.redirect("/listings");
}

module.exports.editListingForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "List does not exits!");
      res.redirect("/listings");
    }
    
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/w_250")

    res.render("listings/edit.ejs", { listing, originalUrl });
    

}

module.exports.updateListing = async (req, res) => {
    if(!req.body.listing) {
      throw new ExpressError (400, "Send Valid data for listings");
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); 
    
    if (typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url, filename};
      await listing.save();
    }
    
    req.flash("success", "List Updated Successfuly!")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    
    let deletedListing = await Listing.findByIdAndDelete(id);
    
    if (!deletedListing) {
      req.flash("error", "List that you are going to delete, does not exits!");
      res.redirect("/listings");
    } else {

      req.flash("success", "List deleted Successfuly!")
      res.redirect("/listings");
    }
}