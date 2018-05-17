import React, { Component } from "react";
import Section6HelpButton from "./Section6HelpButton";

class S6Header extends Component {
  render() {
    return (
      <div className="headerDiv">
        <div className="containerDiv">
          <div className="numberAndTextDiv">
            <div className="bigNumberDiv">
              <p>6</p>
            </div>
            <p className="heroText">Output</p>
          </div>
          <Section6HelpButton />
        </div>
      </div>
      );
  }
}

export default S6Header;
