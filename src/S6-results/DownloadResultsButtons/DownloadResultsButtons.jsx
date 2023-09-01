import React from "react";
import DownloadResultsAsExcel from "./DownloadResultsAsExcel";
import DownloadResultsAsCsv from "./DownloadResultsAsCsv";
import DownloadResultsAsTxt from "./DownloadResultsAsTxt";
import S6DataSlice from "../../State/S6DataSlice";

// import RemoveTimestampOption from "./RemoveTimestampOption";

const DownloadResultsButtons = () => {
  const { showDownloadOutputButtons } = S6DataSlice();

  if (showDownloadOutputButtons) {
    return (
      <div>
        <div className="flex flex-row items-center pl-9 pt-[20px] pb-[20px] w-[750px] h-[100px]">
          <div className="text-2xl mr-[10px]">Download output as</div>
          <DownloadResultsAsExcel />
          <DownloadResultsAsCsv />
          <DownloadResultsAsTxt />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DownloadResultsButtons;
