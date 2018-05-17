import React from "react";
import store from "../../store";
import { easyComp } from "react-easy-state";
import { Transition } from "semantic-ui-react";

const convertToString = () => {
  let qSortPattern = store.getState("qSortPattern");
  if (qSortPattern !== undefined) {
    qSortPattern = qSortPattern.toString();
  }
  return qSortPattern;
};

const DisplayProjectInfo = () => {
  let isVisible = false;
  let numStatementsInfo = store.getState("numStatements");
  let numQSorts = store.getState("numQsorts");
  let numStatements =
    numStatementsInfo + " statements, " + numQSorts + " participants";
  let qSortPattern = convertToString();
  if (qSortPattern) {
    isVisible = true;
  }

  if (numStatementsInfo) {
    return (
      <Transition visible={isVisible} animation="fade" duration={1000}>
        <div style={{ marginTop: 10 }}>
          <h3>{numStatements}</h3>
          <h3 style={{ width: 1150, wordWrap: "break-word" }}>
            Q-sort Design: {" " + qSortPattern}
          </h3>
        </div>
      </Transition>
    );
  } else {
    return null;
  }
};

export default easyComp(DisplayProjectInfo);
