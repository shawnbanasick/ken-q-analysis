import React, { useState } from "react";
import { saveSvgAsPng } from "save-svg-as-png";
import currentDate from "../../Utils/currentDate1";
import currentTime from "../../Utils/currentTime1";
import S1DataSlice from "../../State/S1DataSlice";
import S6DataSlice from "../../State/S6DataSlice";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

const DownloadFactorVizButtons = (props) => {
  const [buttonColor, setButtonColor] = useState(
    "bg-gray-100 hover:bg-gray-400"
  );

  const [buttonColor2, setButtonColor2] = useState(
    "bg-gray-100 hover:bg-gray-400"
  );

  const downloadSvgImage = (imageId) => {
    const factorVizOptions = S6DataSlice.getState().factorVizOptions;
    const shouldAddName = factorVizOptions.willAddCustomNameToDownload;
    const imageName = `#image${imageId}`;

    const projectName = S1DataSlice.getState().projectName;

    const date = currentDate();
    const time = currentTime();
    const dateTime = `${date}_${time}`;
    const cleanFactorName = `${imageId}`;
    let config;
    const customName = factorVizOptions.customDownloadFileNames;
    const customNameLocation = factorVizOptions.customFileNameLocation;
    if (shouldAddName === true) {
      if (customNameLocation === "prepend") {
        config = {
          filename: `${customName}_${projectName}_${cleanFactorName}_${dateTime}`,
        };
      } else if (customNameLocation === "append") {
        config = {
          filename: `${projectName}_${cleanFactorName}_${dateTime}_${customName}`,
        };
      } else if (customNameLocation === "replace") {
        config = {
          filename: customName,
        };
      } else {
        config = {
          filename: `${projectName}_${cleanFactorName}_${dateTime}`,
        };
      }
    } else {
      config = {
        filename: `${projectName}_${cleanFactorName}_${dateTime}`,
      };
    }

    const svg = document.querySelector(imageName);

    // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-
    // creating-an-svg-with-d3-js-ie-safari-an
    function saveSvg(svgEl, name) {
      svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const svgData = svgEl.outerHTML;
      const preface = '<?xml version="1.0" standalone="no"?>\r\n';
      const svgBlob = new Blob([preface, svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    saveSvg(svg, config.filename);
    setButtonColor("bg-green-300 hover:bg-green-400");
  };

  const downloadFacVizAsPng = (imageId) => {
    // getState
    const factorVizOptions = S6DataSlice.getState().factorVizOptions;
    const shouldAddName = factorVizOptions.willAddCustomNameToDownload;

    const imageName = `image${imageId}`;

    const projectName = S1DataSlice.getState().projectName;

    const date = currentDate();
    const time = currentTime();
    const dateTime = `${date}__${time}`;
    const customName = factorVizOptions.customDownloadFileNames;
    const customNameLocation = factorVizOptions.customFileNameLocation;
    const cleanFactorName = `${imageId}__`;
    let nameConfig;

    if (shouldAddName === true) {
      if (customNameLocation === "prepend") {
        nameConfig = `${customName}_${projectName}_${cleanFactorName}${dateTime}`;
      } else if (customNameLocation === "append") {
        nameConfig = `${projectName}__${cleanFactorName}${dateTime}_${customName}`;
      } else if (customNameLocation === "replace") {
        nameConfig = customName;
      } else {
        nameConfig = `${projectName}__${cleanFactorName}${dateTime}`;
      }
    } else {
      nameConfig = `${projectName}__${cleanFactorName}${dateTime}`;
    }
    saveSvgAsPng(document.getElementById(imageName), nameConfig, {
      encoderOptions: 1,
    });
    setButtonColor2("bg-green-300 hover:bg-green-400");
  };

  return (
    <div style={{ display: "flex" }}>
      <ExportGeneralButton
        buttonId={`downloadSvgButtonFacViz${props.id}`}
        handleClick={() => downloadSvgImage(props.id)}
        buttonText="Download SVG"
        otherFormatting="mr-2 ml-6"
        buttonColor={buttonColor}
      />
      <ExportGeneralButton
        buttonId={`downloadPngButtonFacViz${props.id}`}
        handleClick={() => downloadFacVizAsPng(props.id)}
        buttonText="Download PNG"
        otherFormatting="mr-2"
        buttonColor={buttonColor2}
      />
    </div>
  );
};
export default DownloadFactorVizButtons;
