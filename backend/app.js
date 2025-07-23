const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const sessionConfig = require("./config/sessionConfig");

const listingRoutes = require("./routes/listings");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://roaring-bienenstitch-f6652d.netlify.app"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionConfig);

app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.get("/", (req, res) => {
  res.send("Home Route");
});
app.use("/listings", listingRoutes);
app.use("/auth", authRoutes);

module.exports = app;