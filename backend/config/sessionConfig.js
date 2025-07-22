require("dotenv").config();
const session = require("express-session");

const sessionConfig = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});

module.exports = sessionConfig;