const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const bookRouter = require("./routes/book.routes");
const categoryRouter = require("./routes/category.routes");

require("express-async-errors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).end("Ok");
});

app.use("/user", userRouter);

app.use("/book", bookRouter);

app.use("/category", categoryRouter);

app.use(errorHandlerMiddleware);

module.exports = app;