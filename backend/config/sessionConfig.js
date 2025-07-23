require("dotenv").config();
const session = require("express-session");

const sessionConfig = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,
    sameSite: "none",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  },
});

module.exports = sessionConfig;