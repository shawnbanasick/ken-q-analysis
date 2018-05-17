import store from "../store";
import S6Header from "./S6Header";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import FactorVizOptions from "./FactorViz/FactorVizOptions";
import FactorVizDispatch from "./FactorVisualizations/FactorVizDispatch";
import DownloadResultsButtons from "./DownloadResultsButtons/DownloadResultsButtons";
import NoLoadingsFlaggedWarningModal from "../S5-loadings/LoadingsTable/NoLoadingsFlaggedWarningModal";
import DisplayVisualizationsButtons from "./DisplayVisualizationsButtons/DisplayVisualizationsButtons";
import FactorSelectionForOutputButtons from "./FactorSelectionForOutput/FactorSelectionForOutputButtons";
import OutputFactorTablesTransitionContainer from "./OutputFactorTablesTransitionContainer";
import MultipleFactorsFlaggedWarningModal from "./MultipleFactorsFlaggedWarningModal";
import RefreshFactorVizButton from './FactorVisualizations/RefreshFactorVizButton';

class S6GrayBox extends Component {
  render() {
    let shouldDisplayFactorViz = store.getState("displayFactorVisualizations");
    let showStandardErrorsDifferences = store.getState(
      "showStandardErrorsDifferences"
    );
    return (
      <div className="section">
        <S6Header />
        <FactorSelectionForOutputButtons />
        <DownloadResultsButtons />
        <NoLoadingsFlaggedWarningModal />
        <MultipleFactorsFlaggedWarningModal />
        <OutputFactorTablesTransitionContainer />
        <div>
          { showStandardErrorsDifferences && (
            <span style={ { fontSize: 26 } }>Factor Visualizations</span>
            ) }
          <div>
            <DisplayVisualizationsButtons />
            <FactorVizOptions />
            <RefreshFactorVizButton />
            { shouldDisplayFactorViz && <FactorVizDispatch /> }
          </div>
        </div>
      </div>
      );
  }
}

export default easyComp(S6GrayBox);
