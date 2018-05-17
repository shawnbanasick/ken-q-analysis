import React from "react";
import { Button } from "semantic-ui-react";

const ExcelType1HelpLinkButton = () => (
  <div>
    <a href="https://ken_q_tools.gitbooks.io/ken-q-analysis-reference-guide/content/1-2-1-excel-type-1.html" target="_blank" rel="noopener noreferrer" style={ { targetNew: "tab" } }>
      <Button id="excelT1HelpLink" style={ { marginLeft: 65, marginTop: 20 } } basic>
        <strong style={ { color: "#2185d0" } }>Help - Type 1</strong>
      </Button>
    </a>
  </div>
);

export default ExcelType1HelpLinkButton;
