import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import AirplanemodeInactiveIcon from "@material-ui/icons/AirplanemodeInactive";

const useStyles = makeStyles((theme) => ({
  country: {
    "font-weight": "bold",
    "padding-top": theme.spacing(2)
  },
  airportContainer: {
    cursor: "pointer",
    margin: `${theme.spacing(0.25)} ${theme.spacing(1)} ${theme.spacing(0.25)} ${theme.spacing(1)}`,
    "padding-left": theme.spacing(1),
    "padding-right": theme.spacing(1),
    "&:hover": {
      "background-color": "#fafafa"
    }
  }
}));
export default function AirportList(props) {
  const classes = useStyles();

  const getCountriesAndAirportsList = (filter, sources) => {
    filter = filter.toLowerCase().trim();
    const filteredSources = filterAvailableSources(sources, filter);

    const result = Object.keys(filteredSources).sort().map((country) => {
      return (
        <Box key={country}>
          <Typography className={classes.country}>{country}</Typography>
          {getAirportList(filteredSources[country], filter)}
        </Box>
      );
    });
    if (result.length === 0) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexDirection="column"
        >
          <Box>
            <AirplanemodeInactiveIcon fontSize="large"></AirplanemodeInactiveIcon>
          </Box>
          <Typography variant="h6" align="center">
            No airports found
          </Typography>
        </Box>
      );
    }
    return <>{result}</>;
  };

  const filterAvailableSources = (sources, filter) => {
    let filtered = {};

    Object.keys(sources).forEach((country) => {
      if (country.toLowerCase().startsWith(filter)) {
        filtered[country] = sources[country];
        return;
      }

      const filteredAirports = sources[country].filter(
        (airport) =>
          airport.name.toLowerCase().includes(filter) ||
          airport.code.toLowerCase().includes(filter)
      );

      if (filteredAirports.length > 0) {
        filtered[country] = filteredAirports;
      }
    });

    return filtered;
  };

  const getAirportList = (country) => {
    return country.sort((a,b) => a.name.localeCompare(b.name)).map((airport) => {
      return (
        <Box
          display="flex"
          justifyContent="space-between"
          onClick={handleAirportClick}
          className={classes.airportContainer}
          key={airport.code}
        >
          <Box>
            <Typography varian="h6">{airport.name}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography varian="h6" color="textSecondary">
              {airport.code}
            </Typography>
          </Box>
        </Box>
      );
    });
  };

  const handleAirportClick = (event) => {
    const airportName = event.currentTarget.children[0].innerText;
    const airportCode = event.currentTarget.children[1].innerText;

    props.airportClickHandler({
      name: airportName,
      code: airportCode
    });
  };

  if (props.loading === true) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box height="100%" width="100%">
      {getCountriesAndAirportsList(props.filter, {
        ...props.sources
      })}
    </Box>
  );
}
