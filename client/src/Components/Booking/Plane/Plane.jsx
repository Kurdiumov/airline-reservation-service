import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Embraer_E175 from "./Embraer_E175";
import Airbus_A320Neo from "./Airbus_A320Neo";
import Boeing_747_400 from "./Boeing_747_400";

export default function SeatSelection(props) {
  const availablePlaneTypes = [
    "Embraer E175",
    "Airbus A320neo",
    "boeing 747-400"
  ];

  if (!props.model) {
    throw new Error("Aircraft model must be provided.");
  }

  if (!availablePlaneTypes.includes(props.model)) {
    throw new Error(
      `Unknown aircraft model provided: '${props.model}'.
      Available values are ${availablePlaneTypes.join(", ")}`
    );
  }

  const [model] = useState(props.model);
  const [unavailableSeats] = useState(props.unavailableSeats ?? []);
  const selectedSeats = useSelector(({ booking }) =>
    [...Object.values(booking.passengers.adults), ...Object.values(booking.passengers.children)].map(x => x.selectedSeat)
  );

  const createAircraft = () => {
    const aircraftProps = {
      unavailableSeats: unavailableSeats,
      selectedSeats: selectedSeats,
      onSeatSelectionChanged: (id, selected, isBusiness) => {
        props.onSeatSelectionChanged(id, selected, isBusiness);
      }
    };

    if (model === availablePlaneTypes[0]) {
      return <Embraer_E175 {...aircraftProps}></Embraer_E175>;
    } else if (model === availablePlaneTypes[1]) {
      return <Airbus_A320Neo {...aircraftProps}></Airbus_A320Neo>;
    } else if (model === availablePlaneTypes[2]) {
      return <Boeing_747_400 {...aircraftProps}></Boeing_747_400>;
    }

    return null;
  };

  return (
    <Container className="plane" disableGutters={true}>
      <Box  width="100%" height="100%" display="flex" justifyContent="space-around">{createAircraft()}</Box>
    </Container>
  );
}
