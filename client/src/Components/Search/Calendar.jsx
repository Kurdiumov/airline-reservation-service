import React from "react";
import Calendar from "react-calendar";
import moment from "moment";
import momentTimezone from "moment-timezone";
import "./Calendar.scss";

export default function CalendarWrapper(props) {
  const shouldDateBeDisabled = ({ date }) => {
    return !props.availableDates.includes(moment(date).format("YYYY-MM-DD"));
  };

  return (
    <div className="departureDate">
      <Calendar
        calendarType="ISO 8601"
        onChange={props.setDepartureDate}
        tileDisabled={shouldDateBeDisabled}
        defaultValue={
          props.departureDate.getTime ? props.departureDate : new Date()
        }
        prev2Label={null}
        next2Label={null}
        minDate={new Date()}
        maxDate={(function () {
          let date = new Date();
          date.setMonth(date.getMonth() + 6);
          return date;
        })()}
      ></Calendar>
    </div>
  );
}
