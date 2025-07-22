require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB or start server:", err);
  }
}

main();