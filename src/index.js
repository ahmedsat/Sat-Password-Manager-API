require("dotenv").config();
require("express-async-errors");

const express = require("express");

const ConnectedDB = require("./DB/connectDB");

const authRouter = require("./routes/auth");
const passwordsRouter = require("./routes/password");

const { errorHandler, notFoundHandler, auth } = require("./middlewares");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ...req.headers });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/passwords", auth, passwordsRouter);

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
