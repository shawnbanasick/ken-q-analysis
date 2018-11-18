import React from "react";
import { Button } from "semantic-ui-react";

const pqMethodInputHelpButton = () => (
  <div>
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki/1.4-PQMethod-File-Import"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button
        id="pqMethodInputHelpButton"
        style={{ marginLeft: 65, marginTop: 20 }}
        size="huge"
        basic
      >
        <strong style={{ color: "#2185d0" }}>Help - PQMethod</strong>
      </Button>
    </a>
  </div>
);

export default pqMethodInputHelpButton;
