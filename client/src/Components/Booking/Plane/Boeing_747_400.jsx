import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import MainDeck from "./Boeing-747-400/MainDeck";
import UpperDeck from "./Boeing-747-400/UpperDeck";

const useStyles = makeStyles(() => ({
  button: {
    height: "4rem",
    width: "4rem",
    "border-radius": "50%",
    position: "fixed",
    top: "50%",
    left: "520px"
  }
}));

export default function Boeing_747_400(props) {
  const classes = useStyles();
  const [deck, setDeck] = useState("main");

  const toggleDeck = () => {
    deck === "main" ? setDeck("upper") : setDeck("main");
  };

  return (
    <Box position="relative" width="600px">
      <Box>
        {deck === "main" && <MainDeck {...props}></MainDeck>}
        {deck === "upper" && <UpperDeck {...props}></UpperDeck>}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleDeck}
        className={classes.button}
      >
        {deck === "main" ? (
          <ExpandLessRoundedIcon fontSize="large" />
        ) : (
          <ExpandMoreRoundedIcon fontSize="large" />
        )}
      </Button>
    </Box>
  );
}
