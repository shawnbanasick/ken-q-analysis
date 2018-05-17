import React, { Component } from "react";
import Section5HelpButton from "./Section5HelpButton";

class S5Header extends Component {
  render() {
    return (
      <div className="headerDiv">
        <div className="containerDiv">
          <div className="numberAndTextDiv">
            <div className="bigNumberDiv">
              <p>5</p>
            </div>
            <p className="heroText">Factor Loadings</p>
          </div>
          <Section5HelpButton />
        </div>
      </div>
      );
  }
}

export default S5Header;
