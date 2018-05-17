import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import StatementsHeader from "../StatementsHeader/StatementsHeader";
import StatementList from "./StatementList";

class StatementsContainer extends Component {
  render() {
    let statements = store.getState("statements");
    let isVisible = false;
    if (statements) {
      isVisible = true;
    }
    return (
      <Transition visible={isVisible} animation="fade" duration={1000}>
        <div>
          <br />
          <StatementsHeader />
          <StatementList statements={statements} />
        </div>
      </Transition>
    );
  }
}

export default easyComp(StatementsContainer);
