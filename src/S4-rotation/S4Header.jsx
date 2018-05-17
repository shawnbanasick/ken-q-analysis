import React, { Component } from "react";
import Section4HelpButton from "./Section4HelpButton";


class S4Header extends Component {
  render() {
    return (
      <div className="headerDiv">
        <div className="containerDiv">
          <div className="numberAndTextDiv">
            <div className="bigNumberDiv">
              <p>4</p>
            </div>
            <p className="heroText">Factor Rotation</p>
          </div>
          <Section4HelpButton />
        </div>
      </div>
      );
  }
}

export default S4Header;
