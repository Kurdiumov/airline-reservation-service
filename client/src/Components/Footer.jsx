import "./Footer.scss";
import React, { Component } from "react";

class Footer extends Component {
  render = () => {
    return (
      <div className="footer">
        <span>
          Made by&nbsp;<a href="https://github.com/Kurdiumov"> Rostyslav Kurdiumov</a>.
        </span>
      </div>
    );
  };
}

export default Footer;
