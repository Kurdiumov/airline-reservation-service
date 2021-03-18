import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import backendConnector from "../backendConnector.js";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useMobileView from "../Hooks/useMobileView";

export default function LocalTime() {
  const isMobile = useMobileView();
  const airportCode = useSelector((state) => state.search?.origin?.code);
  const [city, setCity] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(
    function () {
      let interval = setInterval(() => {
        timezone
          ? setTime(
              moment.tz(new Date(), timezone).format("ddd D, MMM HH:mm:ss")
            )
          : setTime(null);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    },
    [timezone]
  );

  const getAirportDetails = async () => {
    const details = await backendConnector.getAirportDetails(airportCode);

    setCity(details.city);
    setTimezone(details.timezone);
  };

  if (!airportCode) {
    if (city) {
      setCity(null);
      setTimezone(null);
    }
    return null;
  }

  if (!city) {
    getAirportDetails();
    return null;
  }

  if (!time) {
    return null;
  }

  return (
    <Typography align={isMobile ? "right" : "left"}>
      <span>
        Time in{" "}
        <Box component="span" fontWeight="fontWeightBold">
          {city}
        </Box>
        :{" "}
      </span>
      <span className="navbar-local-time">{time}</span>
    </Typography>
  );
}
