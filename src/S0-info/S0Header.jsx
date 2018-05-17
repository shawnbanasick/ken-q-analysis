import "./S0Header.css";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import IntroText from "./IntroText/IntroText";
import store from "../store";
import { easyComp } from "react-easy-state";

const styles = {
  fontSize: 26
};
const styles2 = {
  fontStyle: "italic",
  fontWeight: "bold",
  fontSize: 30
};

let showUpdateMessage = window.showUpdateMessage;

class S0Header extends Component {
  store = {
    showUpdateMessage: showUpdateMessage
  };

  render() {
    let version = store.getState("version");
    return (
      <div className="headerDiv">
        <div className="containerDiv">
          <div className="numberAndTextDiv">
            <div className="bigNumberDiv">
              <p>Q</p>
            </div>
            <p className="heroText">Ken-Q Analysis</p>
          </div>
          <div>
            {showUpdateMessage && (
              <Button size="huge" color="orange">
                An update has been released!
                <br /> Reload the page to install.
              </Button>
            )}
          </div>
        </div>
        <span style={styles}>A Web Application for </span>
        <span style={styles2}>Q Methodology</span>
        <br />
        <span style={styles}>version {version}</span>
        <IntroText />
      </div>
    );
  }
}

export default easyComp(S0Header);
