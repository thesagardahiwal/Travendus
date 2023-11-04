const mongoose = require('mongoose');
const Review = require('./review.js');

const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        
    },
    description: String,
    image: {
        
        url: String,
        filename: String
    },
    price: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    reviews: [ {
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

ListingSchema.post("findOneAndDelete", async(listing)=>{
    if (listing) {

        await Review.deleteMany({_id: {$in: listing.reviews}});
    }


})

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;