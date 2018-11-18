import React from "react";
import { Button } from "semantic-ui-react";

const ButtonExampleBasic = () => (
  <div>
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki/1.3--Easy-HTMLQ-File-Input"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button
        id="easyHtmlqDataInputHelpLink"
        style={{ marginLeft: 65, marginTop: 20 }}
        size="huge"
        basic
      >
        <strong style={{ color: "#2185d0" }}>Help - Easy HTMLQ</strong>
      </Button>
    </a>
  </div>
);

export default ButtonExampleBasic;
