import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useInput from "../../Hooks/useInput";
import Baggage from "./Baggage";
import {
  makeStyles,
  Paper,
  Box,
  TextField,
  Container,
  Typography,
  Button,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    "margin-top": theme.spacing(2),
    "margin-bottom": theme.spacing(2)
  },
  container: {
    padding: theme.spacing(2)
  },
  grid: {
    padding: theme.spacing(2)
  },
  button: {
    "min-width": 92,
    "margin-left": 5,
    "margin-right": 5
  }
}));

export default function Passenger(props) {
  const classes = useStyles();
  const [type] = useState(props.type.toUpperCase());
  const name = useInput("");
  const surname = useInput("");
  const [baggageCount, setBaggageCount] = useState(0);
  const [sex, setSex] = useState(null);
  const baseBaggagePrice = useSelector(({ booking }) => booking.baggagePrice);

  useEffect(() => {
    props.notifyParent(props.id, {
      name: name.value,
      surname: surname.value,
      sex,
      baggageCount
    });
  }, [name, surname, sex, baggageCount]);

  const handleSexBtnClick = (value) => {
    setSex(value);
  };

  return (
    <Paper className={classes.paper}>
      <Container className={classes.container}>
        <Typography variant="h5">
          {props.index + 1}. PASSENGER ({type})
        </Typography>
        <Grid
          container
          spacing={2}
          m={2}
          alignItems="flex-end"
          className={classes.grid}
        >
          <Grid item xs={12} md={4}>
            <TextField label="First Name" fullWidth={true} {...name.bind} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Last Name" fullWidth={true} {...surname.bind} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Box
              display="flex"
              alignItems="flex-end"
              justifyContent="space-evenly"
            >
              <Button
                id="male"
                disableRipple
                disableFocusRipple
                className={classes.button}
                variant={sex === "male" ? "contained" : "outlined"}
                color={sex === "male" ? "primary" : "default"}
                onClick={() => handleSexBtnClick("male")}
              >
                MALE
              </Button>

              <Button
                id="female"
                disableRipple
                disableFocusRipple
                className={classes.button}
                variant={sex === "female" ? "contained" : "outlined"}
                color={sex === "female" ? "primary" : "default"}
                onClick={() => handleSexBtnClick("female")}
              >
                FEMALE
              </Button>
            </Box>
          </Grid>
        </Grid>
        {props.canSelectBaggage && (
          <Baggage
            pricePerItem={baseBaggagePrice}
            count={baggageCount}
            changeCount={setBaggageCount}
          />
        )}
      </Container>
    </Paper>
  );
}
