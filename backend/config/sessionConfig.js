require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require('connect-mongo');

const MONGO_URL = process.env.MONGO_URL;

const store = MongoDBStore.create({
  mongoUrl: MONGO_URL,
  ttl: 14 * 24 * 60 * 60,
  autoRemove: 'interval',
  autoRemoveInterval: 10,
  touchAfter: 24 * 3600
});

store.on('error', function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: { 
    secure: true,
    sameSite: "none",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  },
});

module.exports = sessionConfig;