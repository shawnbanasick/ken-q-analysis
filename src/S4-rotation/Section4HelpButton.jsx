import React from "react";
import store from "../store";
import { easyComp } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";

const Section4HelpButton = () => {
    let showKeepFacForRotButton = store.getState("showKeepFacForRotButton");

    return (
        <Transition visible={ showKeepFacForRotButton } animation="fade" duration={ 1000 }>
          <div>
            <a href="https://ken_q_tools.gitbooks.io/ken-q-analysis-reference-guide/content/4-factor-rotation.html" target="_blank" rel="noopener noreferrer" style={ { targetNew: "tab" } }>
              <Button id="section4HelpButton" floated="right" size="huge" style={ { marginLeft: 65, marginTop: 20 } } basic>
                <strong style={ { color: "#2185d0" } }>Help - Section 4</strong>
              </Button>
            </a>
          </div>
        </Transition>
        );
};
export default easyComp(Section4HelpButton);
