import React, { useCallback } from "react";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import { sortsDisplayText } from "../dataUtilities/sortsDisplayText";
import shiftRawSortsPositive from "../dataUtilities/shiftRawSortsPositive";
import calcMultiplierArrayT2 from "../Excel2/calcMultiplierArrayT2";
import checkUniqueParticipantNames from "../DataDisplay/checkUniqueParticipantName";
import S1DataSlice from "../../State/S1DataSlice";
import ErrorMessageSlice from "../../State/ErrorMessageSlice";

// const handleDropRejected = (...args) => console.log("reject", args);

const FileUpload = () => {
  const {
    setNumQsorts,
    setQSortPattern,
    setNumStatements,
    setRespondentNames,
    setMainDataObject,
    setSortsDisplayText,
    setMultiplierArray,
    setDataOrigin,
    setStatementNumArray,
  } = S1DataSlice();

  const {
    setCsvErrorMessage,
    setShowCsvErrorModal,
    setExcelErrorMessage1,
    setShowExcelErrorModal,
  } = ErrorMessageSlice();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
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
        qSortPatternArray: number[],
        lines3: any[],
        participantNames: string[],
        mainDataObject: any[],
        sortsDisplayTextArray: string[],
        multiplierArray: number[];

      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();

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
            setCsvErrorMessage(error.message);
            setShowCsvErrorModal(true);
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
          setDataOrigin("csv");
          setStatementNumArray(statNumArray);
        };
        reader.readAsText(file);
      });
    },
    [
      setCsvErrorMessage,
      setShowCsvErrorModal,
      setNumQsorts,
      setQSortPattern,
      setNumStatements,
      setRespondentNames,
      setMainDataObject,
      setSortsDisplayText,
      setMultiplierArray,
      setDataOrigin,
      setExcelErrorMessage1,
      setShowExcelErrorModal,
      setStatementNumArray,
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
