import S1Header from "./S1Header";
import React from "react";
import DataTabs from "./DataTabs/DataTabs";
import ProjectName from "./DataDisplay/ProjectName";
import ProjectInfo from "./DataDisplay/ProjectInfo";
import StatementsContainer from "./DataDisplay/StatementsContainer";
import SortsContainer from "./DataDisplay/SortsContainer";
import S1DataSlice from "../State/S1DataSlice";
import DownloadDatabookButton from "./Downloads/DownloadDatabookButton";
import DownloadKadeZipButton from "./Downloads/DownloadKadeZipButton";
import DownloadPQMethodDATButton from "./Downloads/DownloadPQMethodDATButton";
import DownloadPQMethodSTAButton from "./Downloads/DownloadPQMethodSTAButton";
import StartNewAnalysisButton from "../S2-corr/StartNewAnalysisButton";
import InputErrorModal from "./ErrorChecking/InputErrorModal";
import UnforcedWarningModal from "./ErrorChecking/ErrorChecking/UnforcedWarningModal";

// todo - fade in the data display - https://play.tailwindcss.com/wfzSFIYmBF

const S1GrayBox = () => {
  const { hasImportedSorts, hasImportedStatements } = S1DataSlice();
  if (hasImportedSorts && hasImportedStatements) {
    return (
      <div
        id="S1GrayBoxContainerDiv"
        className="flex flex-col items-center text-2xl bg-blue-100 rounded-md p-6"
      >
        <S1Header />
        <DataTabs />
        <div className="flex flex-col items-center w-full bg-gray-300 rounded-md mt-8">
          <p className="text-5xl mt-6">Project Information</p>
          <div className="overflow-x-auto overflow-y-auto rounded-md bg-gray-100 h-[800px] w-11/12 mt-6 mb-6">
            <ProjectName />
            <ProjectInfo />
            <StatementsContainer />
            <SortsContainer />
          </div>
          <div className="flex flex-col w-22/24 bg-gray-300 rounded-md p-4">
            <p>Export Project Data:</p>
            <div className="flex flex-row justify-between rounded-md bg-gray-300 p-2 mb-1">
              <DownloadDatabookButton />
              <DownloadKadeZipButton />
              <div>
                <DownloadPQMethodSTAButton />
                <DownloadPQMethodDATButton />
              </div>
            </div>
          </div>
          <div className="flex flex-row w-22/24 justify-start mt-8 mb-8">
            <StartNewAnalysisButton />
            <InputErrorModal />
            <UnforcedWarningModal />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center mb-2 p-6 text-2xl bg-blue-100 rounded-md">
        <S1Header />
        <DataTabs />
      </div>
    );
  }
};

export default S1GrayBox;
