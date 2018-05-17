import React from "react";
import { Button } from "semantic-ui-react";

const ExcelType3HelpLinkButton = () => (
  <div>
    <a
      href="https://ken_q_tools.gitbooks.io/ken-q-analysis-reference-guide/content/1-2-3-excel-type-3.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button id="excelT3HelpLink" style={{ marginLeft: 65, marginTop: 40 }} basic>
        <strong style={{ color: "#2185d0" }}>Help - Type 3</strong>
      </Button>
    </a>
  </div>
);

export default ExcelType3HelpLinkButton;
