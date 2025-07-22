const Listing = require("../models/listing");
const upload = require("../config/multerconfig");

const listingController = {
  index: async (req, res) => {
    try {
      const allListings = await Listing.find({});
      res.json(allListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ message: "Error fetching listings" });
    }
  },

  show: async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await Listing.findById(id).populate("author");
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      const sessionUserId = req.session?.user?._id?.toString() || null;
      res.json({ listing, sessionUserId });
    } catch (error) {
      console.error("Error fetching listing:", error);
      res.status(500).json({ message: "Error fetching listing" });
    }
  },

  create: async (req, res) => {
    try {
      const newListing = new Listing({
        ...req.body,
        author: req.session.user._id,
      });
      await newListing.save();
      res.status(201).json(newListing);
    } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Error creating listing" });
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      console.error("Error fetching listing for edit:", error);
      res.status(500).json({ message: "Error fetching listing for edit" });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await Listing.findById(id);

      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      if (listing.author.toString() !== req.session.user._id.toString()) {
        return res.status(403).json({ message: "Forbidden: Not the author" });
      }

      await Listing.findByIdAndUpdate(id, { ...req.body });
      res.status(200).json({ message: "Listing updated successfully" });
    } catch (error) {
      console.error("Error updating listing:", error);
      res.status(500).json({ message: "Error updating listing" });
    }
  },

  deleteListing: async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await Listing.findById(id);

      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      if (listing.author.toString() !== req.session.user._id.toString()) {
        return res.status(403).json({ message: "Forbidden: Not the author" });
      }

      await Listing.findByIdAndDelete(id);
      res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).json({ message: "Error deleting listing" });
    }
  },

  getImage: async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      console.error("Error fetching image for listing:", error);
      res.status(500).json({ message: "Error fetching image" });
    }
  },

  uploadImage: async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      if (req.file) {
        listing.image = req.file.filename;
        await listing.save();
        return res.status(200).json({ success: true, image: listing.image });
      } else {
        return res.status(400).json({ message: "No image file provided" });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Error uploading image" });
    }
  },
};

module.exports = listingController;