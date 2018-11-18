import React from "react";
import { Button } from "semantic-ui-react";

const ReferenceManualDownloadButton = () => (
  <div>
    <a href="https://github.com/shawnbanasick/ken-q-analysis/wiki" target="_blank" rel="noopener noreferrer" style={ { targetNew: "tab" } }>
      <Button id="referenceGuideLink" style={ { margin: 20, opacity: 0.9 } } basic size="huge">
        <strong>Reference Manual</strong>
      </Button>
    </a>
  </div>
);

export default ReferenceManualDownloadButton;
