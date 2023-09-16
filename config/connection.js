const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.DB_URI;
const { logger } = require("../winston");

async function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(URI, { useNewUrlParser: true });
    mongoose.connection
      .once("open", () => resolve(logger.info("DB connected")))
      .on("error", () => reject(logger.error("Connection error")));
  });
}

module.exports = connect;
