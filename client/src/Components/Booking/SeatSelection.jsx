import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plane from "./Plane/Plane";
import backendConnector from "../../backendConnector";

import { setSeat } from "../../Actions/booking";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2)
  },
  button: {
    "margin-right": theme.spacing(2),
    "margin-bottom": theme.spacing(2)
  },
  tableRow: {
    "&selected, &:hover": {
      backgroundColor: "green"
    }
  }
}));

export default function SeatSelection() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const booking = useSelector((state) => state.booking);

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const passengers = useSelector(({ booking }) => { return ({...booking.passengers.adults, ...booking.passengers.children})});
  const [selectedPassenger, setSelectedPassenger] = useState(Object.keys(passengers)[0] ?? null);
  const [unavailableSeats, setUnavailableSeats] = useState(null);

  useEffect(() => {
    async function fetchBusySeats(flightId) {
      const busySeats = await backendConnector.getBusySeats(flightId);
      setUnavailableSeats(busySeats);
    }

    fetchBusySeats(booking.selectedFlight);
  }, []);

  if (unavailableSeats == null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={600}>
        <CircularProgress size={100} />
      </Box>
    );
  }

  const handleClick = (passenger) => {
    setSelectedPassenger(passenger);
  };

  const handleSeatSelection = (id, selected, isBusiness = false) => {
    if (selectedPassenger == null) {
      return;
    }

    if (selected === false && getSelectedSeatByPassengerId(selectedPassenger) !== id) { // When someone tries to unselect seat of another passenger
      return;
    }

    dispatch(setSeat(selectedPassenger, selected === true ? id : null, isBusiness));
    forceUpdate();
  };

  const getSelectedSeatByPassengerId = (id) => {
    if (passengers[id]) {
      return passengers[id].selectedSeat;
    }

    return null;
  }

  const getPassengersTable = () => {
    const getTableRows = (collection) => {
      return (
        <>
          {Object.keys(collection).map((item) => {
            return (
              <TableRow
                key={item}
                hover
                role="checkbox"
                onClick={() => handleClick(item)}
                selected={selectedPassenger === item}
                className={classes.tableRow}
              >
                <TableCell align="center" component="th" scope="row">
                  {collection[item].name} {collection[item].surname}
                </TableCell>
                <TableCell align="center">{collection[item].selectedSeat}</TableCell>
              </TableRow>
            );
          })}
        </>
      );
    };

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Passenger</TableCell>
            <TableCell align="center">Seat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getTableRows(passengers)}
        </TableBody>
      </Table>
    );
  };

  const allPassengersHaveSelectedSeat = () => {
    return Object.values(passengers).every(x => x.selectedSeat);
  };

  const onBookBtnClicked = () => {
    history.push("/summary")
  }

  return (
    <Container className="booking" disableGutters={true}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Box display="flex" flexDirection="column" width="100%">
              {getPassengersTable()}
              <Box
                mt={2}
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!allPassengersHaveSelectedSeat()}
                  className={classes.button}
                  onClick={onBookBtnClicked}
                >
                  Book
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Plane
              model={booking.aircraftModel}
              unavailableSeats={unavailableSeats}
              onSeatSelectionChanged={handleSeatSelection}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
