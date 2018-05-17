import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./Dropzone.css";
import parseExcelType2 from "../excelUploadLogic/parseExcelType2";

const handleDropRejected = (...args) => console.log("reject", args);

class FileUpload extends Component {
    handleDrop(acceptedFiles) {
        parseExcelType2(acceptedFiles);
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
