import React from "react";
import { Button } from "semantic-ui-react";

const BetaLinkButton = () => (
    <div>
      <a href="https://shawnbanasick.github.io/ken-q-analysis-beta/index.html#section1" target="_blank" rel="noopener noreferrer" style={ { targetNew: "tab" } }>
        <Button id="BetaLinkButton" style={ { margin: 20, opacity: 0.9 } } basic size="huge">
          <strong>Ken-Q Analysis Beta Version</strong>
        </Button>
      </a>
    </div>
);

export default BetaLinkButton;
