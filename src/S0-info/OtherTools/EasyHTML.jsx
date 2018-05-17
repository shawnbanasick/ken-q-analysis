import React from "react";
import { Button } from "semantic-ui-react";

const EasyHtmlButton = () => (
  <div>
    <a
      href="https://docs.google.com/presentation/d/1fOYxQOo2XpgR1lZ4gyGO_dRi9Ehh6-0TN98us2xPEPs/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button id="easyHtmlqLink" style={{ margin: 20, opacity: 0.9 }} basic size="huge">
        <strong>Easy HTMLQ</strong>
      </Button>
    </a>
  </div>
);

export default EasyHtmlButton;
