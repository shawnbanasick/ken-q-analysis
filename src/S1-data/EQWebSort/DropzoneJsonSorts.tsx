import React, { useCallback } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useDropzone } from "react-dropzone";
// import shiftRawSortsPositive from "../dataUtilities/shiftRawSortsPositive";
// import { sortsDisplayText } from "../dataUtilities/sortsDisplayText";
import convertJSONToData from "./convertJSONToData";
import S1DataSlice from "../../State/S1DataSlice";
// import calcMultiplierArrayT2 from "../Excel2/calcMultiplierArrayT2";
import createMainDataObject from "../dataUtilities/createMainDataObject";
// const handleDropRejected = (...args: any) => console.log("reject", args);
import checkUniqueParticipantNames from "../DataDisplay/checkUniqueParticipantName";
import parseParticipantNames from "./parseParticipantNames";

const FileUpload = () => {
  const {
    setDataOrigin,
    setJsonParticipantId,
    setShowJsonParticipantIdDropdown,
    setCsvData,
    setJsonObj,
    setShowJsonFileLoadedMessage,
    setHasImportedSorts,
  } = S1DataSlice();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      /*
      let numberSorts: number,
        qSortPatternArray: number[],
        lines3: any[],
        participantNames: string[],
        mainDataObject: any[],
        sortsDisplayTextArray: string[],
        multiplierArray: number[];
      */

      acceptedFiles.forEach((file: any) => {
        const reader: any = new FileReader();

        reader.onabort = () => {
          console.log("file reading was aborted");
        };

        reader.onerror = () => {
          console.log("file reading has failed");
        };

        // reader.readAsText(reader);
        reader.onload = (e: any) => {
          // console.log("reader results " + reader.result);
          let results = JSON.parse(reader.result);

          // console.log("results: " + (JSON.stringify(results)));
          try {
            // Get object keys
            let resultsArray = [];
            for (let key in results) {
              if (results.hasOwnProperty(key)) {
                resultsArray.push(results[key]);
              }
            }

            // transform to md array
            // todo - this is the source of the extra brackets
            let jsonData = convertJSONToData(results);
            console.log(JSON.stringify(jsonData));
            interface tempObjSet {
              key?: number;
              text?: string;
              value?: string;
            }

            // get options for id selection dropdown
            // let jsonParticipantId = [];
            let columnHeaders = jsonData[0][0];

            console.log(JSON.stringify(columnHeaders));

            // seems to be id and sort data
            let participantSorts = cloneDeep(jsonData[1]);
            console.log(JSON.stringify(jsonData[1]));

            let optionElArray = [];
            for (let i = 0; i < columnHeaders.length; i++) {
              let optionEl = (
                <option key={`${columnHeaders[i]}`}>{columnHeaders[i]}</option>
              );
              optionElArray.push(optionEl);
            }

            // QAV #1 - Project Name

            // QAV #2 - Multiplier Array

            // QAV #4 - Participant Names  AND QAV #6 Participant Sorts
            let participantNames2 = parseParticipantNames(jsonData[1]);
            let participantNames =
              checkUniqueParticipantNames(participantNames2);
            console.log(JSON.stringify(participantNames));

            // QAV #5 - Number of Q sorts
            let numQsorts = participantNames.length;
            console.log("numQsorts: " + numQsorts);

            // Create Project History array
            // todo - get project name variable
            let projectHistoryArray = [
              "projectName" + " data loaded from EQ Web Sort data",
            ];

            // Create Main Data Object
            let mainDataObject = createMainDataObject(
              participantNames,
              participantSorts
            );
            console.log(JSON.stringify(mainDataObject));
            // console.log(JSON.stringify(optionElArray));

            setJsonParticipantId(optionElArray);
            setShowJsonParticipantIdDropdown(true);
            setCsvData(jsonData);
            setJsonObj(results);
            setDataOrigin("json");
            setShowJsonFileLoadedMessage(true);
            setHasImportedSorts(true);
          } catch (error: any) {
            console.log(error);
          }

          /*
          // Do whatever you want with the file contents
          const parsedFile = Papa.parse(reader.result, papaConfig);
          console.log(JSON.stringify(parsedFile.data));

          try {
            lines3 = parsedFile.data;

            // remove the first (header) line
            lines3.shift();

            // get num sorts to set qav variables
            numberSorts = lines3.length;

            console.log(lines3.length);

            if (lines3.length < 1) {
              throw new Error("Can't find any Q sorts in the file!");
            }

            // remove empty "" strings from array
            let maxLength = lines3[0].length;
            for (let i = 0; i < lines3[0].length - 1; i++) {
              let value1 = lines3[0][i];
              if (value1 === "") {
                maxLength = i;
                break;
              }
            }

            // extract qav variables
            let arrayShiftedPositive;
            mainDataObject = [] as any[];
            let respondentNames = [];

            // iterate for
            let minValue: number | undefined;

            interface loopTempObj {
              name?: string;
              posShiftSort?: any;
              rawSort?: [];
              displaySort?: string;
            }

            for (let j = 0; j < lines3.length; j++) {
              lines3[j].length = maxLength;
              let tempObj: loopTempObj = {};

              let name = lines3[j].shift();
              tempObj.name = name;
              respondentNames.push(name);
              let asNumbers = lines3[j].map(Number);
              if (j === 0 && minValue !== undefined) {
                minValue = Math.min(...asNumbers);
              }
              // grab last for for qSortPattern
              qSortPatternArray = [...asNumbers];

              if (minValue !== undefined && minValue < 1) {
                arrayShiftedPositive = shiftRawSortsPositive(
                  asNumbers,
                  minValue
                );
              } else {
                arrayShiftedPositive = [...asNumbers];
              }

              tempObj.posShiftSort = arrayShiftedPositive;
              tempObj.rawSort = asNumbers;
              tempObj.displaySort = lines3[j].toString();
              mainDataObject.push(tempObj);
            }

            qSortPatternArray.sort(function (a, b) {
              return a - b;
            });

            multiplierArray = calcMultiplierArrayT2([...qSortPatternArray]);
            sortsDisplayTextArray = sortsDisplayText(mainDataObject);

            participantNames = checkUniqueParticipantNames(respondentNames);
          } catch (error: any) {
            // setCsvErrorMessage(error.message);
            //  setShowCsvErrorModal(true);
          }

          let statNumArray = [];
          for (let x = 0; x < lines3[0]?.length; x++) {
            statNumArray.push(x + 1);
          }

          // console.log(qSortPatternArray);
          
          setNumQsorts(numberSorts);
          setQSortPattern(qSortPatternArray);
          setNumStatements(lines3[0]?.length);
          setRespondentNames(participantNames);
          setMainDataObject(mainDataObject);
          setSortsDisplayText(sortsDisplayTextArray);
          setMultiplierArray(multiplierArray);
          setDataOrigin("json");
          */
          // setStatementNumArray(statNumArray);
        };
        reader.readAsBinaryString(file);
      });
    },
    [
      setJsonParticipantId,
      setShowJsonParticipantIdDropdown,
      setCsvData,
      setJsonObj,
      setDataOrigin,
      setShowJsonFileLoadedMessage,
      setHasImportedSorts,
      // setStatementNumArray,
    ]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="flex justify-center items-center pt-[20px]"
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} />
      <p>Drag and drop CSV Q sort file here, or click to select</p>
    </div>
  );
};

export default FileUpload;

/*

const FileUpload = () => {
  handleDrop(acceptedFiles) {
    acceptedFiles.forEach((file) => {
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
          showJsonFileLoadedMessage: true,
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
        <Dropzone
          onDrop={this.handleDrop}
          multiple={false}
          onDropRejected={handleDropRejected}
        >
          {!showJsonFileLoadedMessage && (
            <span>
              Drag a file here or
              <br /> click to load.
            </span>
          )}
          {showJsonFileLoadedMessage && (
            <section className="jsonSection">
              -- File loaded -- Select Participant Id to display
            </section>
          )}
        </Dropzone>
      </section>
    );
  }
}

export default easyComp(FileUpload);

*/
