import "./Dropzone.css";
import store from "../../../store";
import Dropzone from "react-dropzone";
import cloneDeep from "lodash/cloneDeep";
import React, { Component } from "react";
import { sortsDisplayText } from "../uploadLogic/sortsDisplayText";
import { parsePQMethodFile } from "../uploadLogic/parsePQMethodFile";
import checkUniqueParticipantName from '../../SortsList/checkUniqueParticipantName';

const handleDropRejected = (...args) => console.log("reject", args);

class FileUploadRawSorts extends Component {
  handleDrop(acceptedFiles) {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        // parse blob with helper function
        let data = parsePQMethodFile(fileAsBinaryString);

        let mainDataObject = cloneDeep(data[4][1]);
        let sortsDisplayTextArray = sortsDisplayText(mainDataObject);

        let participantNamesPrep = cloneDeep(data[4][0]);
        let participantNamesPrep2 = checkUniqueParticipantName(participantNamesPrep);


        // send data to STATE
        store.setState({
          numQsorts: data[0],
          projectName: data[1],
          projectHistoryArray: [
            data[1] + " data loaded from PQMethod DAT file"
          ],
          numStatements: data[2],
          multiplierArray: cloneDeep(data[3]),
          respondentNames: participantNamesPrep2,
          mainDataObject: mainDataObject,
          sortsDisplayText: sortsDisplayTextArray,
          qSortPattern: data[5],
          dataOrigin: "pqmethod"
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
          <br /> click to load.
        </Dropzone>
      </section>
      );
  }
}

export default FileUploadRawSorts;
