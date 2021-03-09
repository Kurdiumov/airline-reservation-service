import React, { Component } from "react";
import { connect } from "react-redux";
import "./Passenger.scss";

class Passenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type.toUpperCase(),
      name: "",
      surname: "",
      sex: ""
    };
  }

  onNameInputChanged = (event) => {
    let newState = { ...this.state };
    newState.name = event.target.value;
    this.setState(newState);
  };

  onSurnameInputChanged = (event) => {
    let newState = { ...this.state };
    newState.surname = event.target.value;
    this.setState(newState);
  };

  handleSexClick = (event) => {
    let newState = { ...this.state };
    newState.sex = event.target.value;
    this.setState(newState);
  };


  // TODO Add baggage selection to passenger
  render = () => {
    return (
      <div className="passenger">
        <h3>
          {this.props.index}. PASSENGER ({this.state.type}){" "}
          <form>
            <input
              type="text"
              onInput={this.onNameInputChanged}
              value={this.state.name}
            ></input>
            <input
              type="text"
              onInput={this.onSurnameInputChanged}
              value={this.state.surname}
            ></input>
            <input
              type="button"
              value="Male"
              onClick={this.handleSexClick}
              className={this.state.sex === "Male" ? "selected" : ""}
            ></input>
            <input
              type="button"
              value="Female"
              onClick={this.handleSexClick}
              className={this.state.sex === "Female" ? "selected" : ""}
            ></input>
          </form>
        </h3>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {};
};

const MapDispatchToProps = (dispatch) => ({});

export default connect(null, {})(Passenger);
