import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./Dropzone.css";
import parseExcelType3 from "../excelUploadLogic/parseExcelType3";

const handleDropRejected = (...args) => console.log("reject", args);

class FileUpload extends Component {
    handleDrop(acceptedFiles) {
        parseExcelType3(acceptedFiles);
    }

    render() {
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
