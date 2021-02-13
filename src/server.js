import path from "path";
import express from "express";
import auth from "./routes/auth.js";
import authenticateJWT from "./middlewares/authenticateJWT.js";

export default () => {
  const app = express();

  // MiddleWares
  app.use(express.json());
  app.use("/api/user", auth);

  app.get("/backendStatus", (req, res) => {
    res.json({ status: "connected" });
  });

  app.get("/checkToken", authenticateJWT, (req, res) => {
    res.json({
      token: req.token,
      description: "Only logged in users can access this page"
    });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/../client/build")));
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  });
};
