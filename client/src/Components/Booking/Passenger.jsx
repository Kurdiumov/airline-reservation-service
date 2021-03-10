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

  validate = () => {
    const isValid =
      this.state.name.length > 0 &&
      this.state.surname.length > 0 &&
      this.state.sex != "";

    this.props.notifyParent(this.props.id, isValid);
  };

  onNameInputChanged = async (event) => {
    let newState = { ...this.state };
    newState.name = event.target.value;
    await this.setState(newState);
    this.validate();
  };

  onSurnameInputChanged = async (event) => {
    let newState = { ...this.state };
    newState.surname = event.target.value;
    await this.setState(newState);
    this.validate();
  };

  handleSexClick = async (event) => {
    let newState = { ...this.state };
    newState.sex = event.target.value;
    await this.setState(newState);
    this.validate();
  };

  // TODO Add baggage selection to passenger
  render = () => {
    return (
      <div className="passenger">
        <h3>
          {this.props.index + 1}. PASSENGER ({this.state.type}){" "}
          <form>
            <input
              type="text"
              onInput={this.onNameInputChanged}
              value={this.state.name}
              placeholder="First Name"
            ></input>
            <input
              type="text"
              onInput={this.onSurnameInputChanged}
              value={this.state.surname}
              placeholder="Last Name"
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
