import path from "path";
import cors from "cors";
import express from "express";
import auth from "./routes/auth.js";
import flights from "./routes/flights.js";
import airports from "./routes/airports.js";
import currencies from "./routes/currencies.js";
import authenticateJWT from "./middlewares/authenticateJWT.js";

export default () => {
  const app = express();

  // MiddleWares
  app.use(
    cors({ origin: true, credentials: true, exposedHeaders: ["auth-token"] })
  );
  app.use(express.json());
  app.use("/api/user", auth);
  app.use("/api/flights", flights);
  app.use("/api/airports", airports);
  app.use("/api/currencies", currencies);

  app.get("/checkToken", authenticateJWT, (req, res) => {
    res.json({
      token: req.token,
      description: "Only logged in users can access this page"
    });
  });

  if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(path.resolve(), "client/build");
    app.use(express.static(staticPath));
    console.log("Serving client static files at", staticPath);

    // Catch-All Route Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("client/build", "index.html"));
    });
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  });
};
