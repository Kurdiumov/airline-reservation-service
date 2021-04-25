import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../ContentContainer";
import BookingInformation from "./BookingInformation";

export default function Summary() {
  const history = useHistory();
  const booking = useSelector((state) => state.booking);
  
  return (
    <ContentContainer>
      <Paper>
      <Typography variant="h5" color="primary" align="center" style={{padding: "8px 0 0 0"}}>Summary</Typography>
        <Box m={3}>
          <BookingInformation booking={booking} />
          <Box mt={5} pb={5} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={() => history.push("/")}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Book & go to Home
            </Button>
          </Box>
        </Box>
      </Paper>
    </ContentContainer>
  );
}
