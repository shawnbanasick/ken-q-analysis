import React, { Component } from "react";
import BrowserCheck from "./browserCheck";
import BrowserInfo from "./BrowserInfo";
import "./SupportedBrowsers.css";

const styles = {
  marginTop: 50
};

class SupportedBrowsers extends Component {
  render() {
    return (
      <div style={styles}>
        <span>
          <strong>Supported Browsers:</strong>
        </span>
        <div>
          <BrowserInfo />
        </div>
        <div className="supportedBrowsersDiv">
          <BrowserCheck />
        </div>
      </div>
    );
  }
}

export default SupportedBrowsers;
