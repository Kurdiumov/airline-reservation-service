import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "../Actions/currency.js";
import { makeStyles, FormControl, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100px",
    padding: "6px 16px;",
    "margin-top": "2px",
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent"
    }
  }
}));

export default function CurrencySelector() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentCurrency = useSelector(
    (state) => state.currencies.currentCurrency
  );
  const exchangeRates = useSelector((state) => state.currencies.exchangeRates);

  const handleCurrencyChange = (event) => {
    event.preventDefault();
    dispatch(setCurrency(event.target.value));
  };

  return (
    <FormControl value="outlined" className={classes.formControl}>
      <Select
        disableUnderline
        name="currencies"
        id="currencies"
        value={currentCurrency}
        onChange={handleCurrencyChange}
      >
        {Object.keys(exchangeRates).map((key) => {
          return (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
