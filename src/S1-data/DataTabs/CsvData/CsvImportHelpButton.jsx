import React from "react";
import { Button } from "semantic-ui-react";

const ButtonExampleBasic = () => (
  <div>
    <a
      href="https://ken_q_tools.gitbooks.io/ken-q-analysis-reference-guide/content/1-1-csv-file-import.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button id="csvInputHelpLink" style={{ marginLeft: 65, marginTop: 20 }} size="huge" basic>
        <strong style={{ color: "#2185d0" }}>Help - CSV</strong>
      </Button>
    </a>
  </div>
);

export default ButtonExampleBasic;
