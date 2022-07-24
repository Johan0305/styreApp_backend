const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./src/db");
const userRouter = require("./src/routes/user");
const walletRouter = require("./src/routes/wallet");
const listRouter = require("./src/routes/list");
const expenseRouter = require("./src/routes/expense");
require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
connect();
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/wallets", walletRouter);
app.use("/lists", listRouter);
app.use("/expenses", expenseRouter);

app.listen(port, () => {
  console.log("Running Ok");
});
