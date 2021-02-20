import express from "express";
import sources from "../availableSourcesMockData.js";

const router = express.Router();

router.get("/availableSources", async (req, res) => {
    res.json({
        sources: sources
    });
});

router.get("/availableDestinations", async (req, res) => {
    // TODO create mock data for destinations too
});

export default router;
