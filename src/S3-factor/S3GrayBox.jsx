import S3Header from "./S3Header";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import TypeOfAnalysisTransitionContainer from "./TypeOfAnalysisTransitionContainer";
import UnrotatedFactorsTransitionContainer from "./UnrotatedFactorsTransitionContainer";


class S3GrayBox extends Component {
  render() {
    return (
      <div className="section">
        <S3Header />
        <TypeOfAnalysisTransitionContainer />
        <UnrotatedFactorsTransitionContainer />
      </div>
      );
  }
}

export default easyComp(S3GrayBox);
