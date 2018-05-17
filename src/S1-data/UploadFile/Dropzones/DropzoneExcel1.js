import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./Dropzone.css";
import { parseExcelType1 } from "../excelUploadLogic/parseExcelType1";

const handleDropRejected = (...args) => console.log("reject", args);

class FileUpload extends Component {
    handleDrop(acceptedFiles) {
        parseExcelType1(acceptedFiles);
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
