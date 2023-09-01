import React from "react";
import { Button } from "semantic-ui-react";

const ExcelType1HelpLinkButton = () => (
  <div>
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki/1.2.1-Excel-Type-1-File-Import"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button
        id="excelT1HelpLink"
        style={{ marginLeft: 65, marginTop: 20 }}
        basic
      >
        <strong style={{ color: "#2185d0" }}>Help - Type 1</strong>
      </Button>
    </a>
  </div>
);

export default ExcelType1HelpLinkButton;
