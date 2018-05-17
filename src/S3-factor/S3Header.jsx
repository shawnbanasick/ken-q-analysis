import "./S3Header.css";
import React, { Component } from "react";
import Section3HelpButton from "./Section3HelpButton";

class S3Header extends Component {
  render() {
    return (
      <div className="headerDiv">
        <div className="containerDiv">
          <div className="numberAndTextDiv">
            <div className="bigNumberDiv">
              <p>3</p>
            </div>
            <p className="heroText">Factor Extraction</p>
          </div>
          <Section3HelpButton />
        </div>
      </div>
      );
  }
}

export default S3Header;
