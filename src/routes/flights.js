import express from "express";
import sources from "../availableSourcesMockData.js";
import destinations from "../availableDestinationsMockData.js";

const router = express.Router();

router.get("/availableSources", async (req, res) => {
  const destination = req.query.destination;
  console.log("Should get sources for destination: ", destination);

  res.json({
    sources: sources
  });
});

router.get("/availableDestinations", async (req, res) => {
  const origin = req.query.origin;
  console.log("Should get sources for sources: ", origin);

  res.json({
    destinations: destinations
  });
});

export default router;
