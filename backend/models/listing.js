const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title: String,
    description: String,
    image: {
        type: String,
        default: "default.png",
    },
    price: Number,
    location: String,
    country: String,
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;