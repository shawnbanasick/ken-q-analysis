import React from "react";
import { Button } from "semantic-ui-react";

const KenQDataButton = () => (
  <div>
    <a
      href="https://shawnbanasick.github.io/ken-q-data/index.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button id="kenqDataLink" style={{ margin: 20, opacity: 0.9 }} basic size="huge">
        <strong>Ken-Q Data</strong>
      </Button>
    </a>
  </div>
);

export default KenQDataButton;
