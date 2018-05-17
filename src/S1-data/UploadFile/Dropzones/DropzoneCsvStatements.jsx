import "./Dropzone.css";
import store from "../../../store";
import Dropzone from "react-dropzone";
import React, { Component } from "react";
//import Papa from "papaparse";
// import shiftRawSortsPositive from "../uploadLogic/shiftRawSortsPositive";
// import { sortsDisplayText } from "../uploadLogic/sortsDisplayText";

const handleDropRejected = (...args) => console.log("reject", args);

class FileUpload extends Component {
    handleDrop(acceptedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const fileAsBinaryString = reader.result;
                    // parse blob by new line
                    let lines = fileAsBinaryString.split(/[\r\n]+/g);
                    // remove empty strings
                    let lines2 = lines.filter(function(e) {
                        return e === 0 || e;
                    });

                    if (lines2.length === 0) {
                        throw new Error("Can't find any statements in the file!");
                    }

                    // send data to STATE
                    store.setState({
                        statements: lines2
                    });
                } catch (error) {
                    // set error message
                    store.setState({
                        csvErrorMessage1: error.message,
                        showCsvErrorModal: true
                    });
                }
            };
            reader.onabort = () => {
                console.log("file reading was aborted");
                store.setState({
                    excelErrorMessage1: "The file reader aborted the load process!",
                    showExcelErrorModal: true
                });
            };
            reader.onerror = () => {
                console.log("The file reader encountered an error");
                store.setState({
                    excelErrorMessage1: "The file reader encountered an error!",
                    showExcelErrorModal: true
                });
            };
            reader.readAsBinaryString(file);
        });
    }

    render() {
        // const {handleDrop} = this.actions;
        return (
            <section>
              <Dropzone onDrop={ this.handleDrop } multiple={ false } onDropRejected={ handleDropRejected }>
                Drag a file here or
                <br /> click to load.
              </Dropzone>
            </section>
            );
    }
}

export default FileUpload;
