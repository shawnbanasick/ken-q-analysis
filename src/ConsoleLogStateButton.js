import React from "react";
import { Button } from "semantic-ui-react";
import { consoleLogState } from "./consoleLogState";
// import "./ConsoleLogStateButton.css";

const styles = {
  margin: 20
};

const ConsoleLogStateButton = () => (
  <div>
    <Button inverted size={"massive"} style={styles} onClick={consoleLogState}>
      STATE
    </Button>
    {/* <FlatButton label="Start Analysis"  /> */}
  </div>
);

export default ConsoleLogStateButton;
