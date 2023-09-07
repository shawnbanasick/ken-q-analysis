import React, { useCallback } from "react";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import { sortsDisplayText } from "../dataUtilities/sortsDisplayText";
import checkUniqueParticipantNames from "../DataDisplay/checkUniqueParticipantName";
import S1DataSlice from "../../State/S1DataSlice";
import ErrorMessageSlice from "../../State/ErrorMessageSlice";
import createMainDataObjectPQMethod from "./createMainDataObjectPQMethod";

// const handleDropRejected = (...args) => console.log("reject", args);

const FileUpload = (props: any) => {
  const {
    isDataLoaded,
    statementsAreLoaded,
    setNumQsorts,
    setQSortPattern,
    setRespondentNames,
    setMainDataObject,
    setSortsDisplayText,
    setMultiplierArray,
    setDataOrigin,
    setProjectName,
    setHasImportedSorts,
    setIsDataLoaded,
    setShowInputErrorModal,
    setSortsAreLoaded,
  } = S1DataSlice();

  const {
    setCsvErrorMessage,
    setShowCsvErrorModal,
    setExcelErrorMessage1,
    setShowExcelErrorModal,
  } = ErrorMessageSlice();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (isDataLoaded) {
        setShowInputErrorModal({
          showModal: true,
          titleText: "Data Loading Error",
          bodyText: "Data are already loaded.",
          bodyText2: "Reload the webpage to start a new project.",
        });
        return;
      }

      const papaConfig = {
        delimiter: "", // auto-detect
        newline: "", // auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,
        complete: undefined,
        error: undefined,
        download: false,
        downloadRequestHeaders: undefined,
        downloadRequestBody: undefined,
        skipEmptyLines: false,
        chunk: undefined,
        chunkSize: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [
          ",",
          "\t",
          "|",
          ";",
          Papa.RECORD_SEP,
          Papa.UNIT_SEP,
        ],
      };

      let numberSorts: number,
        lines3: any[],
        participantNames: string[],
        sortsDisplayTextArray: string[],
        mainDataObject: any[] | [] = [],
        multiplierArray: number[],
        projName: string,
        qSortPattern: number[];

      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();
        let respondentNameArr: string[] = [];

        reader.onabort = () => {
          console.log("file reading was aborted");
          setExcelErrorMessage1("The file reader aborted the load process!");
          setShowExcelErrorModal(true);
        };

        reader.onerror = () => {
          console.log("file reading has failed");
          setExcelErrorMessage1("The file reader encountered an error!");
          setShowExcelErrorModal(true);
        };
        // reader.readAsText(reader);
        reader.onload = (e) => {
          // Do whatever you want with the file contents

          const parsedFile = Papa.parse(reader.result, papaConfig);
          // console.log(JSON.stringify(parsedFile.data));

          try {
            lines3 = parsedFile.data;

            // remove the first (header) line
            let header = lines3.shift();
            // ['  0  9 33 Lipset Study (PQMETHOD testfile; cf. Brown', ' 1980', ' pp. 183ff.)       ']
            projName = header[0].slice(10, 30);

            let multiplierRow = lines3.shift();

            // todo - move to external
            let maxMin2 = multiplierRow[0].slice(0, 6).split(" ");
            let multiplierText2 = multiplierRow[0].slice(7).split(" ");
            let maxMin = maxMin2
              .filter((item: string) => item !== "")
              .map((item: string) => parseInt(item, 10));
            multiplierArray = multiplierText2
              .filter((item: string) => item !== "")
              .map((item: string) => parseInt(item, 10));

            if (lines3.length < 1) {
              throw new Error("Can't find any Q sorts in the file!");
            }

            // convert multiplier array to qSortPattern
            let defaultValues = [
              -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
              13,
            ];
            qSortPattern = [];
            for (let i = 0; i < multiplierArray.length; i++) {
              let fileNumber = multiplierArray[i];
              let defaultNumber = defaultValues[i];
              if (fileNumber !== 0) {
                for (let j = 0; j < fileNumber; j++) {
                  qSortPattern.push(defaultNumber);
                }
              }
            }

            /*
            // remove empty "" strings from array
            let maxLength = lines3.length;
            for (let i = 0; i < lines3.length; i++) {
              let value1 = lines3[i];
              if (value1 === "") {
                maxLength = i;
                break;
              }
            }
            */

            // todo - move to external
            let filteredLines3 = lines3.filter((item) => item[0] !== "");

            // todo - move to external
            let filteredLines4 = filteredLines3.map((item) => {
              // get respondent names
              let tempString = item[0].slice(0, 8).trim();
              // get sort values
              let tempSortString = item[0].slice(9);
              respondentNameArr.push(tempString);
              // add spaces before minus sign so split works properly
              let str = tempSortString.replace(/[\-]/g, " -").trim();
              let str2 = str.split(" ");
              // convert array strings to numbers
              let str3 = str2.map((item: any) => {
                return Number(item);
              });
              return str3;
            });

            // get num sorts to set qav variables
            numberSorts = filteredLines4.length;

            /*
            let sampleSort = [...filteredLines4[0]];
            qSortPatternArray = sampleSort.sort(function (a, b) {
              return a - b;
            });
            */

            // create mainDataObject
            mainDataObject = createMainDataObjectPQMethod(
              filteredLines4,
              respondentNameArr
            );

            /*
            
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
            */

            participantNames = checkUniqueParticipantNames(respondentNameArr);
            sortsDisplayTextArray = sortsDisplayText(mainDataObject);
          } catch (error: any) {
            setCsvErrorMessage(error.message);
            setShowCsvErrorModal(true);
          }

          // console.log(qSortPatternArray);
          setNumQsorts(numberSorts);
          setQSortPattern(qSortPattern);
          setRespondentNames(participantNames);
          setMainDataObject(mainDataObject);
          setSortsDisplayText(sortsDisplayTextArray);
          setMultiplierArray(multiplierArray);
          setDataOrigin("pqmethod");
          setProjectName(projName);
          setHasImportedSorts(true);
          props.updateColor();

          setSortsAreLoaded(true);
          if (statementsAreLoaded) {
            setIsDataLoaded(true);
          }
        };
        reader.readAsText(file);
      });
    },
    [
      isDataLoaded,
      statementsAreLoaded,
      setIsDataLoaded,
      setShowInputErrorModal,
      setCsvErrorMessage,
      setShowCsvErrorModal,
      setNumQsorts,
      setQSortPattern,
      setRespondentNames,
      setMainDataObject,
      setSortsDisplayText,
      setMultiplierArray,
      setDataOrigin,
      setExcelErrorMessage1,
      setShowExcelErrorModal,
      setProjectName,
      setHasImportedSorts,
      setSortsAreLoaded,
      props,
    ]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="flex justify-center items-center pt-[20px]"
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} />
      <p>Drag and drop DAT file here, or click to select</p>
    </div>
  );
};

export default FileUpload;

/*

import "./Dropzone.css";
import Dropzone from "react-dropzone";
import cloneDeep from "lodash/cloneDeep";
import React, { Component } from "react";
import { sortsDisplayText } from "../uploadLogic/sortsDisplayText";
import { parsePQMethodFile } from "../uploadLogic/parsePQMethodFile";
import checkUniqueParticipantName from '../../SortsList/checkUniqueParticipantName';

const handleDropRejected = (...args) => console.log("reject", args);

const FileUploadRawSorts = () => {
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

    // const {handleDrop} = this.actions;
    return (
      <section>
        <Dropzone onDrop={ handleDrop } multiple={ false } onDropRejected={ handleDropRejected }>
          Drag a file here or
          <br /> click to load.
        </Dropzone>
      </section>
      );
}

export default FileUploadRawSorts;

*/
