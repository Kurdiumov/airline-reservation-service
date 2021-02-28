import React, { Component } from "react";
import Calendar from "react-calendar";
import "./Calendar.scss";

class CalendarWrapper extends Component {
  shouldDateBeDisabled = (arg) => {
    const { date, activeStartDate } = arg;
    // TODO Check if there are any flights on this date
    return false;
  };

  render = () => {
    return (
      <div className="departureDate">
        <Calendar
          calendarType="ISO 8601"
          onChange={this.props.setDepartureDate}
          tileDisabled={this.shouldDateBeDisabled}
          defaultValue={
            this.props.departureDate.getTime
              ? this.props.departureDate
              : new Date()
          }
          prev2Label={null}
          next2Label={null}
          minDate={new Date()}
          maxDate={(function () {
            let date = new Date();
            date.setMonth(date.getMonth() + 3);
            return date;
          })()}
        ></Calendar>
      </div>
    );
  };
}

export default CalendarWrapper;
