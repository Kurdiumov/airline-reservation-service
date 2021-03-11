import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import backendConnector from "../backendConnector.js";
import "./LocalWeather.scss";
import usePrevious from "../Hooks/usePrevious";

export default function LocalWeather() {
  const airportCode = useSelector((state) => state.search?.origin?.code);
  const [condition, setCondition] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const prevAirportCode = usePrevious(airportCode);

  useEffect(() => {
    if (airportCode !== prevAirportCode) {
      if (!airportCode) {
        setCondition(null);
        setTemperature(null);
        return;
      }

      backendConnector.getCurrentWeather(airportCode).then((weather) => {
        setCondition(weather.condition);
        setTemperature(Math.round(weather.temperature));
      });
    }
  }, [airportCode]);

  if (!airportCode || condition === null || temperature === null) {
    return null;
  }

  return (
    <div className="localWeather">
      {temperature}°C {condition}
    </div>
  );
}
