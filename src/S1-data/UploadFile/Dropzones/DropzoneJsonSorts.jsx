import "./Dropzone.css";
import store from "../../../store";
import Dropzone from "react-dropzone";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";

//import Papa from "papaparse";
// import shiftRawSortsPositive from "../uploadLogic/shiftRawSortsPositive";
// import { sortsDisplayText } from "../uploadLogic/sortsDisplayText";
import convertJSONToData from "../uploadLogic/convertJSONToData";

const handleDropRejected = (...args) => console.log("reject", args);

class FileUpload extends Component {
    handleDrop(acceptedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                // console.log("reader results " + reader.result);
                let results = JSON.parse(reader.result);

                // console.log("results: " + (JSON.stringify(results)));

                let resultsArray = [];
                for (let key in results) {
                    if (results.hasOwnProperty(key)) {
                        resultsArray.push(results[key]);
                    }
                }

                // transform to md array
                // todo - this is the source of the extra brackets
                let csvData = convertJSONToData(results);

                // get options for id selection dropdown
                // console.log(JSON.stringify(csvData[0][0]));
                let jsonParticipantId = [];
                let columnHeaders = csvData[0][0];
                for (let i = 0; i < columnHeaders.length; i++) {
                    let tempObj = {};
                    tempObj.key = i + 1;
                    tempObj.text = columnHeaders[i];
                    tempObj.value = columnHeaders[i];
                    jsonParticipantId.push(tempObj);
                }

                store.setState({
                    jsonParticipantId: jsonParticipantId,
                    showJsonParticipantIdDropdown: true,
                    csvData: csvData,
                    jsonObj: results,
                    dataOrigin: "json",
                    showJsonFileLoadedMessage: true
                });
            };
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.readAsBinaryString(file);
        });
    }

    render() {
        // const {handleDrop} = this.actions;
        let showJsonFileLoadedMessage = store.getState("showJsonFileLoadedMessage");
        return (
            <section>
              <Dropzone onDrop={ this.handleDrop } multiple={ false } onDropRejected={ handleDropRejected }>
                { !showJsonFileLoadedMessage && (
                  <span>
                                                    Drag a file here or<br /> click to load.
                                                  </span>
                  ) }
                { showJsonFileLoadedMessage && (
                  <section className="jsonSection">
                    -- File loaded -- Select Participant Id to display
                  </section>
                  ) }
              </Dropzone>
            </section>
            );
    }
}

export default easyComp(FileUpload);
