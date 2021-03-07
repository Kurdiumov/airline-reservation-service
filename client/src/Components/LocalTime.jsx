import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import momentTimezone from "moment-timezone";
import backendConnector from "../backendConnector.js";
import "./LocalTime.scss";

class LocalTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      country: null,
      timezone: null,
      time: null
    };
  }

  getAirportDetails = async (airportCode) => {
    const details = await backendConnector.getAirportDetails(airportCode);

    let newState = { ...this.state };
    newState.city = details.city;
    newState.country = details.country;
    newState.timezone = details.timezone;
    this.setState(newState);
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      let time = null;
      if (this.state.timezone) {
        time = moment
          .tz(new Date(), this.state.timezone)
          .format("ddd D, MMM HH:mm:ss");
      }

      let newState = { ...this.state };
      newState.time = time;
      this.setState(newState);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render = () => {
    if (!this.props.airportCode) {
      if (this.state.city) {
        this.setState({
          city: null,
          country: null,
          timezone: null
        });
      }
      return <div className="localTime" />;
    }

    if (!this.state.city) {
      this.getAirportDetails(this.props.airportCode);
      return <div className="localTime" />;
    }

    if (!this.state.time) {
      return <div className="localTime" />;
    }

    return (
      <div className="localTime">
        Local time in <span>{this.state.city}</span>: {this.state.time}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    airportCode: state.search?.origin?.code
  };
};

export default connect(mapStateToProps, {})(LocalTime);
