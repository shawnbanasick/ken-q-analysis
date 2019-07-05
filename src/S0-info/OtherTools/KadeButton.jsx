import React from "react";
import { Button } from "semantic-ui-react";

const KadeButton = () => (
  <div>
    <a
      href="https://github.com/shawnbanasick/kade"
      target="_blank"
      rel="noopener noreferrer"
      style={{ targetNew: "tab" }}
    >
      <Button
        id="BetaLinkButton"
        style={{ marginTop: 20, marginBottom: 20, opacity: 0.9 }}
        color="orange"
        size="huge"
      >
        <strong>KADE</strong>
      </Button>
    </a>
  </div>
);

export default KadeButton;
