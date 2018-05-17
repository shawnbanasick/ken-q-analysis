import React, { Component } from "react";
import S4Header from "./S4Header";
import { easyComp } from "react-easy-state";
import FactorSelectDropdown from "./FactorKeepSelection/FactorSelectDropdown";
import FactorsKeptNotification from "./FactorKeepSelection/FactorsKeptNotification";
import RotationButtonGroup from "./RotationButtons/RotationButtonGroup";
import JudgementalRotationContainer from "./JudgementalRotation/JudgementalRotationContainer";

class S4GrayBox extends Component {
  render() {
    return (
      <div className="section">
        <S4Header />
        <div style={{ maxWidth: 1197 }}>
          <FactorSelectDropdown />
          <FactorsKeptNotification />
        </div>
        <div>
          <RotationButtonGroup />
        </div>
        <JudgementalRotationContainer />
      </div>
    );
  }
}

export default easyComp(S4GrayBox);

// minor change
