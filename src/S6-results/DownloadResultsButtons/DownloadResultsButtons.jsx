import React from "react";
import store from "../../store";
import { easyComp } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import DownloadResultsAsExcel from "./DownloadResultsAsExcel";
import DownloadResultsAsCsv from "./DownloadResultsAsCsv";
import RemoveTimestampOption from "./RemoveTimestampOption";
// import ExcelDownloadAnchor from "./ExcelDownloadAnchor";
// import CsvDownloadAnchor from "./CsvDownloadAnchor";
import NewDownloadButton from './NewDownloadButton';

class DownloadResultsButtons extends React.Component {
  render() {
    let showDownloadOutputButtons = store.getState("showDownloadOutputButtons");
    store.setState({
      showExcelDownloadAnchor: false
    });
    return (
      <Transition visible={ showDownloadOutputButtons } animation="fade" duration={ 1000 }>
        <div style={ { paddingTop: 20, paddingBottom: 20, width: 950 } }>
          <RemoveTimestampOption />
          <span style={ { fontSize: 26, marginRight: 5 } }>
                                                      Download complete output as:
                                                    </span>
          <DownloadResultsAsExcel />
          <DownloadResultsAsCsv />
          <NewDownloadButton />
          <br></br>
          <span style={ { fontSize: 16 } }>(Right click on the "Download" button and select "Save Link As..." to specify the download location.)</span>
        </div>
      </Transition>
      );
  }
}

export default easyComp(DownloadResultsButtons);
