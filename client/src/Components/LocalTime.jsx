import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import backendConnector from "../backendConnector.js";
import "./LocalTime.scss";

export default function LocalTime() {
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
    return <div className="localTime" />;
  }

  if (!city) {
    getAirportDetails();
    return <div className="localTime" />;
  }

  if (!time) {
    return <div className="localTime" />;
  }

  return (
    <div className="localTime">
      Local time in <span>{city}</span>: {time}
    </div>
  );
}
