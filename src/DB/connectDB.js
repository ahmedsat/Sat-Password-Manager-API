require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
