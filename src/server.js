require("dotenv-safe").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

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
  console.log("DB successfully connected");
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/backendStatus", (req, res) => {
    res.json({ status: "connected" });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/../client/build")));
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  });
});