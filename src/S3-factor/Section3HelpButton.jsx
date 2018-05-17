import React from "react";
import store from "../store";
import { easyComp } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";

const Section3HelpButton = () => {
  let showFactorExtractionButtons = store.getState(
    "showFactorExtractionButtons"
  );

  return (
    <Transition
      visible={showFactorExtractionButtons}
      animation="fade"
      duration={1000}
    >
      <div>
        <a
          href="https://ken_q_tools.gitbooks.io/ken-q-analysis-reference-guide/content/3-factor-extraction.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ targetNew: "tab" }}
        >
          <Button
            id="Section3HelpButton"
            floated="right"
            size="huge"
            style={{ marginLeft: 65, marginTop: 20 }}
            basic
          >
            <strong style={{ color: "#2185d0" }}>Help - Section 3</strong>
          </Button>
        </a>
      </div>
    </Transition>
  );
};

export default easyComp(Section3HelpButton);
