import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import OfferCard from "./OfferCard";
import backendConnector from "../backendConnector.js";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Offers() {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    backendConnector.getSpecialOffers().then((offers) => {
      if (!isCancelled) {
        setOffers(offers?.offers);
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading === true) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress size={100} />
      </Box>
    );
  }
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <Box mt={10}>
      <Typography variant="h4" align="center" color="secondary">
        Special offers
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
        {offers.map((offer, i) => {
          return (
            <OfferCard
              key={i}
              image={offer.imageUrl}
              title={offer.title}
              description={offer.description}
              price={offer.price}
              origin={offer.origin}
              destination={offer.destination}
              date={offer.date}
            />
          );
        })}
      </Box>
    </Box>
  );
}
