const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./sequelize");

const app = express();
const port = 3000;

app.use(bodyParser.json());

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("hello Ben");
});

app.listen(port, () => {
  console.log(`app initialized at port : ${port} !`);
});
