import React, { Component } from "react";
import { connect } from "react-redux";
import backendConnector from "../backendConnector.js";
import "./LocalWeather.scss";

class LocalWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      condition: null,
      temperature: null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.airportCode !== this.props.airportCode) {
      if (!this.props.airportCode) {
        this.setState({
          condition: null,
          temperature: null
        });
        return;
      }

      backendConnector
        .getCurrentWeather(this.props.airportCode)
        .then((weather) => {
          let newState = { ...this.state };
          newState.condition = weather.condition;
          newState.temperature = weather.temperature;
          this.setState(newState);
        });
    }
  }

  render = () => {
    if (
      !this.props.airportCode ||
      !this.state.condition ||
      !this.state.temperature
    ) {
      return null;
    }

    return (
      <div className="localWeather">
        {this.state.temperature}°C {this.state.condition}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    airportCode: state.search?.origin?.code
  };
};

export default connect(mapStateToProps, {})(LocalWeather);
