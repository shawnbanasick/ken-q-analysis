import React from "react";
import { Button } from "semantic-ui-react";

const ButtonExampleBasic = () => (
  <div>
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki/1.1-CSV-Data-Import"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button
        id="csvInputHelpLink"
        style={{ marginLeft: 65, marginTop: 20 }}
        size="huge"
        basic
      >
        <strong style={{ color: "#2185d0" }}>Help - CSV</strong>
      </Button>
    </a>
  </div>
);

export default ButtonExampleBasic;
