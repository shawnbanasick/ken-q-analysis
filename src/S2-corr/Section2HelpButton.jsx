import React from "react";
import store from "../store";
import { easyComp } from "react-easy-state";
import { Transition, Button } from "semantic-ui-react";

const Section2HelpButton = () => {
  let showCorrelationMatrix = store.getState("showCorrelationMatrix");

  return (
    <Transition
      visible={showCorrelationMatrix}
      animation="fade"
      duration={1000}
    >
      <div>
        <a
          href="https://ken_q_tools.gitbooks.io/ken-q-analysis-reference-guide/content/2-correlation-matrix.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ targetNew: "tab" }}
        >
          <Button
            id="section2HelpButton"
            floated="right"
            size="huge"
            style={{ marginLeft: 65, marginTop: 20 }}
            basic
          >
            <strong style={{ color: "#2185d0" }}>Help - Section 2</strong>
          </Button>
        </a>
      </div>
    </Transition>
  );
};

export default easyComp(Section2HelpButton);
