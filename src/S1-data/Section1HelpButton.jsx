import React from "react";
import { Button } from "semantic-ui-react";

const Section1HelpButton = () => (
    <div>
      <a href="https://ken_q_tools.gitbooks.io/ken-q-analysis-reference-guide/content/1-data-sources.html" target="_blank" rel="noopener noreferrer" style={ { targetNew: "tab" } }>
        <Button id="section1HelpButton" floated="right" size="huge" style={ { marginLeft: 65, marginTop: 20 } } basic>
          <strong style={ { color: "#2185d0" } }>Help - Section 1</strong>
        </Button>
      </a>
    </div>
);

export default Section1HelpButton;
