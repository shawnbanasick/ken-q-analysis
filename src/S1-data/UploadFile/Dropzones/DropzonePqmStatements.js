import "./Dropzone.css";
import store from "../../../store";
import Dropzone from "react-dropzone";
import React, { Component } from "react";

const handleDropRejected = (...args) => console.log("reject", args);

class FileUpload extends Component {
    handleDrop(acceptedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                // parse blob by new line
                let lines = fileAsBinaryString.split(/[\r\n]+/g);
                // remove empty strings
                let lines2 = lines.filter(function(e) {
                    return e === 0 || e;
                });

                let statementNumArray = [];
                for (let i = 0; i < lines2.length; i++) {
                    statementNumArray.push(i + 1);
                }
                // send data to STATE
                store.setState({
                    statements: lines2,
                    numStatements: lines2.length,
                    statementNumArray: statementNumArray
                });
            };
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.readAsBinaryString(file);
        });
    }

    render() {
        // const {handleDrop} = this.actions;
        return (
            <section>
              <Dropzone onDrop={ this.handleDrop } multiple={ false } onDropRejected={ handleDropRejected }>
                Drag a file here or
                <br />click to load.
              </Dropzone>
            </section>
            );
    }
}

export default FileUpload;
