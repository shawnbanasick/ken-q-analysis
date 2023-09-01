import React from "react";
import S6Header from "./S6Header";
import FactorVizOptions from "./FactorViz/FactorVizOptions";
import FactorVizDispatch from "./FactorVisualizations/FactorVizDispatch";
import DownloadResultsButtons from "./DownloadResultsButtons/DownloadResultsButtons";
import NoLoadingsFlaggedWarningModal from "../S5-loadings/LoadingsTable/NoLoadingsFlaggedWarningModal";
import DisplayVisualizationsButtons from "./DisplayVisualizationsButtons/DisplayVisualizationsButtons";
import FactorSelectionForOutputButtons from "./FactorSelectionForOutput/FactorSelectionForOutputButtons";
import MultipleFactorsFlaggedWarningModal from "./MultipleFactorsFlaggedWarningModal";
import RefreshFactorVizButton from "./FactorVisualizations/RefreshFactorVizButton";
import ShowVizOptionsButton from "./DisplayVisualizationsButtons/ShowVizOptionsButton";
import S6DataSlice from "../State/S6DataSlice";
import S5DataSlice from "../State/S5DataSlice";

const S6GrayBox = () => {
  const { displayFactorVisualizations, showStandardErrorsDifferences } =
    S6DataSlice();

  const { showSection6 } = S5DataSlice();

  if (showSection6) {
    return (
      <div className="flex flex-col items-center bg-blue-100 rounded-md p-6">
        <S6Header />
        <div className="w-full bg-gray-300 p-8 rounded-md">
          <div className="flex flex-col items-center">
            <FactorSelectionForOutputButtons />
            <DownloadResultsButtons />
            <NoLoadingsFlaggedWarningModal />
            <MultipleFactorsFlaggedWarningModal />
          </div>
          <div className="flex flex-col items-center">
            {showStandardErrorsDifferences && (
              <p className="text-3xl mt-12 mb-8">Factor Visualizations</p>
            )}
            <div className="flex flex-row mb-4">
              <DisplayVisualizationsButtons />
              <ShowVizOptionsButton />
            </div>
            <RefreshFactorVizButton />
            <FactorVizOptions />
            {displayFactorVisualizations && <FactorVizDispatch />}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default S6GrayBox;
