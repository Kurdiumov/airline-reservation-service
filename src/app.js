import mongoose from "mongoose";
import dotenv from "dotenv-safe";
import server from "./server.js";

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("connection error: ", err);
});

db.once("open", () => {
  console.log("DB successfully connected");
  server();
});
