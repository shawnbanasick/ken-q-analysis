import "./S0GrayBox.css";
import S0Header from "./S0Header";
import React, { Component } from "react";
import OtherTools from "./OtherTools/OtherTools";
import ReferenceManualText from "./IntroText/ReferenceManualText";
import KenQAnalysisBetaText from './IntroText/KenQAnalysisBetaText';
import SupportedBrowsers from "./SupportedBrowsers/SupportedBrowsers";

class S0GrayBox extends Component {
  render() {
    return (
      <div className="section">
        <S0Header />
        <SupportedBrowsers />
        <ReferenceManualText />
        <OtherTools />
        <KenQAnalysisBetaText />
      </div>
      );
  }
}

export default S0GrayBox;
