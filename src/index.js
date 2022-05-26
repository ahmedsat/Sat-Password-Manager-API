require("dotenv").config();
require("express-async-errors");

const express = require("express");
const { errorHandler, notFoundHandler } = require("./middlewares");
const ConnectedDB = require("./DB/connectDB");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await ConnectedDB();
    app.listen(port);
  } catch (err) {
    console.error(err);
  }
};

startServer();
