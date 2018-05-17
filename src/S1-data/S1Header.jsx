import React, { Component } from "react";
// import './S2Header.css';
import Section1HelpButton from "./Section1HelpButton";

class S1Header extends Component {
  render() {
    return (
      <div className="headerDiv">
        <div className="containerDiv">
          <div className="numberAndTextDiv">
            <div className="bigNumberDiv">
              <p>1</p>
            </div>
            <p className="heroText">Data Input</p>
          </div>
          <Section1HelpButton />
        </div>
      </div>
    );
  }
}

export default S1Header;
