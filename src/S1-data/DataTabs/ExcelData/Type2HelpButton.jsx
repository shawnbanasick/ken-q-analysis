import React from "react";
import { Button } from "semantic-ui-react";

const ExcelType2HelpLinkButton = () => (
  <div>
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki/1.2.2-Excel-Type-2-File-Import"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button
        id="excelT2HelpLink"
        style={{ marginLeft: 65, marginTop: 40 }}
        basic
      >
        <strong style={{ color: "#2185d0" }}>Help - Type 2</strong>
      </Button>
    </a>
  </div>
);

export default ExcelType2HelpLinkButton;
