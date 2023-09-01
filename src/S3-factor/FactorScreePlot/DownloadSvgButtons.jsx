import React from "react";
import downloadSvgImage from "./downloadSvgImage";
import downloadPngImage from "./downloadPngImage";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

const DownloadSvgButtons = () => {
  return (
    <div className="flex flex-row space-x-4 mt-8 mr-8 ml-8">
      <ExportGeneralButton
        handleClick={downloadSvgImage}
        buttonText="Download SVG"
      />
      <ExportGeneralButton
        handleClick={downloadPngImage}
        buttonText="Download PNG"
      />
    </div>
  );
};
export default DownloadSvgButtons;
