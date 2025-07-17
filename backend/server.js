require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Listing = require("./models/listing");
const path = require("path");
const crypto = require("crypto");
const multerconfig = require("./config/multerconfig");

const MONGO_URL = process.env.MONGO_URL;

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
    res.send("Home Route")
})

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find()
    res.json(allListings)
})

//Show Route
app.get("/listings/:id", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.json(listing);
})

//Create Route
app.post("/listings", async(req, res) => {
    const newListing = new Listing(req.body)
    await newListing.save()
})

//Edit Route
app.get("/listings/:id/edit", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.json(listing);
})

//Update Route
app.put("/listings/:id", async(req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body})
    res.json({ message: "Listing updated" });
})

//Delete Route
app.delete("/listings/:id", async(req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id)
    res.json({ message: "Deleted successfully" });
})

//Image Route
app.get("/listings/:id/image", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.json(listing);
})

app.post("/listings/:id", multerconfig.single("image"), async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    listing.image = req.file.filename;
    await listing.save();
    res.json({ success: true, image: listing.image });
})

app.listen (5000, () => {
    console.log("server is listening on port 5000")
})