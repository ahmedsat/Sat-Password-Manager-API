require("dotenv").config();
require("express-async-errors");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const express = require("express");

const ConnectedDB = require("./DB/connectDB");

const authRouter = require("./routes/auth");
const passwordsRouter = require("./routes/password");

const { errorHandler, notFoundHandler, auth } = require("./middlewares");

const app = express();
const port = process.env.PORT || 5000;

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("WOW, it's working");
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
