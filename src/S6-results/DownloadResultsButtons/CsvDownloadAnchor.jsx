import React from "react";
import { easyComp } from "react-easy-state";
// import store from "../../store";

class ExcelDownloadAnchor extends React.Component {
  render() {
    return (
      <div style={{ border: "2px solid green", height:25, width: 200  }} id="csvDownloadAnchorDiv" />
    );
  }
}

export default easyComp(ExcelDownloadAnchor);
