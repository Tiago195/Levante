const express = require("express");
const cors = require("cors");
require("express-async-errors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).end("Ok");
})

module.exports = app;