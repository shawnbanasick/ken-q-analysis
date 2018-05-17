import React, { Component } from "react";
import Section2HelpButton from "./Section2HelpButton";

class S2Header extends Component {
  render() {
    return (
      <div className="headerDiv">
        <div className="containerDiv">
          <div className="numberAndTextDiv">
            <div className="bigNumberDiv">
              <p>2</p>
            </div>
            <p className="heroText">Correlation Matrix</p>
          </div>
          <Section2HelpButton />
        </div>
      </div>
      );
  }
}

export default S2Header;
