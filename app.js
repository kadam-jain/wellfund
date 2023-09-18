const express = require("express");
const { logger } = require("./winston");
const connect = require("./config/connection");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 8080;
const userRouter = require("./src/routes/user.routes");
const transactionRouter = require("./src/routes/transaction.routes");
const organisationRouter = require("./src/routes/organisation.routes");
const adminRouter = require("./src/routes/admin.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use("/organisation", organisationRouter);
app.use("/admin", adminRouter);

app.get("/health-check", (req, res) => {
  res.send("Server is running...");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong!");
});

app.listen(port, async () => {
  await connect();
  logger.info(`App listening on port ${port}`);
});
