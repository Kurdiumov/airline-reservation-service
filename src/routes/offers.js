import express from "express";
import Offer from "../model/Offer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find({});
    if (offers && offers.length > 0) {
      return res.json({ offers: offers.sort( () => .5 - Math.random() ) });
    }
    res.status(500).send("Offers is not an array");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
