import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContentContainer from "../ContentContainer";
import AirportList from "./AirportList";
import Calendar from "./Calendar";
import {
  setOrigin,
  setDestination,
  setDepartureDate,
  setFocusedInput
} from "../../Actions/search";
import Passengers, {
  getAdultsPassengersText,
  getChildrenPassengersText,
  getInfantsPassengersText
} from "./Passengers";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    height: "350px",
    width: "50%",
    "border-radius": 5,
    "background-color": theme.palette.primary.main
  },
  formInput: {
    width: "100%",
    "margin-top": theme.spacing(1),
    "margin-bottom": theme.spacing(1),
    height: "3rem",
    backgroundColor: "#fff",
    color: "#000",
    "&:hover": {
      backgroundColor: "#fafafa"
    }
  },
  searchBtn: {
    "margin-top": theme.spacing(1),
    "margin-bottom": theme.spacing(1),
    width: "100%",
    height: "3rem"
  },
  airportFormInput: {
    width: "100%"
  },
  buttonError: {
    border: "1px solid " + theme.palette.error.main
  },
  sidePanel: {
    height: "350px",
    "border-radius": 5,
    "overflow-y": "scroll",
    backgroundColor: "#fff",
    "padding-left": theme.spacing(2),
    "padding-right": theme.spacing(2)
  }
}));

export default function FlightSearch(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const origin = useSelector(({ search }) => search.origin);
  const destination = useSelector(({ search }) => search.destination);
  const departureDate = useSelector(({ search }) => search.departureDate);
  const adults = useSelector(({ search }) => search.passengers.adults);
  const children = useSelector(({ search }) => search.passengers.children);
  const infants = useSelector(({ search }) => search.passengers.infants);
  const originTimezone = useSelector(({ search }) => search.originTimezone);
  const focusedInput = useSelector(({ search }) => search.focusedInput);
  const availableSources = useSelector(({ data }) => data.availableSources);
  const availableDestinations = useSelector(
    ({ data }) => data.availableDestinations
  );
  const availableDates = useSelector(({ data }) => data.availableDates);
  const originsLoading = useSelector(({ data }) => data.originsLoading);
  const destinationsLoading = useSelector(
    ({ data }) => data.destinationsLoading
  );
  const datesLoading = useSelector(({ data }) => data.datesLoading);

  const [originInputValue, setOriginInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const [allInputsAreValid, setAllInputsAreValid] = useState(false);

  const [originInputValid, setOriginInputValid] = useState(false);
  const [destinationInputValid, setDestinationInputValid] = useState(false);
  const [departureDateValid, setDepartureDateValid] = useState(false);

  useEffect(() => {
    setAllInputsAreValid(
      originInputValid && destinationInputValid && departureDateValid
    );
  }, [originInputValid, destinationInputValid, departureDateValid]);

  useEffect(() => {
    setOriginInputValid(!!origin);
    setDestinationInputValid(!!destination);

    if (
      !departureDate ||
      !availableDates.some((date) => {
        return (
          moment(date).format("YYYY-MM-DD") ===
            moment(departureDate).format("YYYY-MM-DD") ||
          moment(date).format("YYYY-MM-DD") ===
            moment(departureDate).add(24, "hours").format("YYYY-MM-DD")
        );
      })
    ) {
      setDepartureDateValid(false);
    } else {
      setDepartureDateValid(true);
    }
  }, [origin, destination, departureDate]);

  if (originInputValue === "" && origin != null) {
    setOriginInputValue(origin.name);
  }

  if (destinationInputValue === "" && destination != null) {
    setDestinationInputValue(destination.name);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!allInputsAreValid) {
      return;
    }

    props.history.push({ pathname: "/search" });
  };

  const setOriginInput = (airport) => {
    setOriginInputValue(airport.name);
    setOriginInputValid(true);
    dispatch(setFocusedInput(""));

    dispatch(setOrigin(airport));
  };

  const setDestinationInput = (airport) => {
    setDestinationInputValue(airport.name);
    setDestinationInputValid(true);
    dispatch(setFocusedInput(""));

    dispatch(setDestination(airport));
  };

  const changeDepartureDate = (date) => {
    dispatch(setFocusedInput(""));
    dispatch(
      setDepartureDate(
        //Get date from calendar without timezone offset
        moment(
          new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        ).format("YYYY-MM-DDThh:mm:ss")
      )
    );
  };

  const onOriginInputChange = (event) => {
    setOriginInputValue(event.target.value);
    setOriginInputValid(true);
    if (origin != null) {
      dispatch(setOrigin(null));
    }
  };

  const onDestinationInputChange = (event) => {
    setDestinationInputValue(event.target.value);
    setDestinationInputValid(true);

    if (destination != null) {
      dispatch(setDestination(null));
    }
  };

  const onFocusChanged = (event) => {
    dispatch(setFocusedInput(event.currentTarget.id));
  };

  const getPrettyDate = (date, timezone = "GMT") => {
    if (timezone) {
      return moment(date).format("YYYY-MM-DD");
    }

    return moment(date).format("YYYY-MM-DD");
  };

  const getForm = () => {
    return (
      <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
        <Box
          width="90%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          margin="auto"
          mt={2}
          mb={2}
        >
          <OutlinedInput
            size="small"
            color="secondary"
            className={classes.formInput}
            id="Origin"
            placeholder="Origin"
            value={originInputValue}
            onChange={onOriginInputChange}
            onFocus={onFocusChanged}
            error={!originInputValid}
            notched={false}
            endAdornment={
              <InputAdornment position="end">
                {origin?.code ?? ""}
              </InputAdornment>
            }
          />

          <OutlinedInput
            size="small"
            color="secondary"
            className={classes.formInput}
            id="Destination"
            placeholder="Destination"
            value={destinationInputValue}
            onChange={onDestinationInputChange}
            onFocus={onFocusChanged}
            error={!destinationInputValid}
            notched={false}
            endAdornment={
              <InputAdornment position="end">
                {destination?.code ?? ""}
              </InputAdornment>
            }
          />

          <Button
            id="DepartureDate"
            variant="contained"
            onClick={onFocusChanged}
            disableFocusRipple
            disableRipple
            disableElevation
            className={
              departureDateValid
                ? classes.formInput
                : `${classes.formInput} ${classes.buttonError}`
            }
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography color="textSecondary">Departure</Typography>
              <Typography variant="h6">
                {getPrettyDate(departureDate, originTimezone)}
              </Typography>
            </Box>
          </Button>

          <Button
            id="Passengers"
            variant="contained"
            onFocus={onFocusChanged}
            className={classes.formInput}
            disableFocusRipple
            disableRipple
            disableElevation
          >
            <Box display="flex" justifyContent="space-evenly" width="100%">
              {getAdultsPassengersText(adults)}
              {children > 0 && getChildrenPassengersText(children)}
              {infants > 0 && getInfantsPassengersText(infants)}
            </Box>
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.searchBtn}
            disabled={!allInputsAreValid}
            onFocus={onFocusChanged}
            disableFocusRipple
            disableElevation
            disableRipple
          >
            Search
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <ContentContainer>
      <Grid container>
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              className={classes.searchContainer}
            >
              {getForm()}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              display={focusedInput ? "block" : "none"}
            >
              {focusedInput && (
                <Box className={classes.sidePanel} boxShadow={2}>
                  {focusedInput === "Origin" && (
                    <AirportList
                      filter={originInputValue}
                      sources={availableSources}
                      airportClickHandler={setOriginInput}
                      loading={originsLoading}
                    />
                  )}
                  {focusedInput === "Destination" && (
                    <AirportList
                      filter={destinationInputValue}
                      sources={availableDestinations}
                      airportClickHandler={setDestinationInput}
                      loading={destinationsLoading}
                    />
                  )}
                  {focusedInput === "Passengers" && <Passengers />}
                  {focusedInput === "DepartureDate" && (
                    <Box display="flex" height="100%" alignItems="center">
                    <Calendar
                      timezone={originTimezone}
                      departureDate={departureDate}
                      setDepartureDate={changeDepartureDate}
                      loading={datesLoading}
                      availableDates={availableDates.map((date) =>
                        moment(date).tz(originTimezone)?.format("YYYY-MM-DD")
                      )}
                    />
                    </Box>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}
