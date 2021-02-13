require("dotenv-safe").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mongooseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8a6n.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongooseConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("connection error: ", err);
});
db.once("open", () => {
  console.log("Connected to DB.");
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  });
});
