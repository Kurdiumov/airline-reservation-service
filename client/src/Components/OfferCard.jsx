import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { getPriceInCurrentCurrency } from "../utils";
import {
    setOrigin,
    setDestination,
    setDepartureDate,
  } from "../Actions/search";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: theme.spacing(3)
  },
  media: {
    height: 140
  }
}));

export default function OfferCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { image, title, description, price, origin, destination, date } = props;
  const currentCurrency = useSelector(
    ({ currencies }) => currencies.currentCurrency
  );

  const handleCardClick = () => {
    dispatch(setOrigin({code: origin, name: origin}));
    dispatch(setDestination({code: destination, name: destination}));
    dispatch(setDepartureDate(date));
    history.push("/search");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" color="primary">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" display="inline">
            {description}{" "}
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            component="p"
            display="inline"
            style={{ fontWeight: 600 }}
          >
            {getPriceInCurrentCurrency(price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
