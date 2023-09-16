const express = require("express");
const { logger } = require("./winston");
const connect = require("./config/connection");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const userRouter = require('./src/routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.get("/health-check", (req, res) => {
  res.send("Server is running...");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong!");
});

app.listen(port, async() => {
  await connect();
  logger.info(`App listening on port ${port}`);
});
