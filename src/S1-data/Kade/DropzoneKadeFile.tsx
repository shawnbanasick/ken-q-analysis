import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import parseKade from "./parseKade";
import S1DataSlice from "../../State/S1DataSlice";
import ErrorMessageSlice from "../../State/ErrorMessageSlice";
import calcQsortPatternArray from "./calcQsortPatternArray";
import createRawSorts from "./createRawSorts";
import createMainDataObject from "../dataUtilities/createMainDataObject";
import createParticipantNameArray from "./createParticipantNameArray";
import modifySortPattern from "./modifySortPattern";
import createStatementNumArray from "./createStatementNumArray";
import { sortsDisplayText } from "../dataUtilities/sortsDisplayText";

var jsZip = require("jszip");

// const handleDropRejected = (...args) => console.log("reject", args);

const FileUpload = (props: any) => {
  const { setExcelErrorMessage1, setShowExcelErrorModal } = ErrorMessageSlice();
  const {
    isDataLoaded,
    setProjectName,
    setStatements,
    setQSortPattern,
    setDataOrigin,
    setNumStatements,
    setNumQsorts,
    setSortsDisplayText,
    setMainDataObject,
    setMultiplierArray,
    setStatementNumArray,
    setRespondentNames,
    setHasImportedSorts,
    setHasImportedStatements,
    setIsDataLoaded,
    setShowInputErrorModal,
  } = S1DataSlice();

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

      acceptedFiles.forEach((file: any) => {
        let statementNumArray: number[] = [];
        let numberSorts: number = 0;
        let qSortPatternArray: Array<any> = [];
        let participantNames: any[] = [];
        let sortDisplayText: string[] = [];
        let multiplierArray: number[] = [];
        let mainDataObject: any[] = [];

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
        reader.onload = (e) => {
          // Do whatever you want with the file contents
          try {
            jsZip.loadAsync(file).then(function (zip: any) {
              Object.keys(zip.files).forEach(function (filename) {
                setDataOrigin("Kade");

                // HANDLE STATEMENTS
                if (filename === "statements.txt") {
                  zip.files["statements.txt"]
                    .async("string")
                    .then(function (fileData: string) {
                      const result = fileData
                        .split(/\r?\n/)
                        .filter((element) => element)
                        .map((element) => element.trim());

                      // console.log(JSON.stringify(result));

                      setNumStatements(result.length);

                      statementNumArray = createStatementNumArray(
                        result.length
                      );
                      // console.log(JSON.stringify(statementNumArray));

                      setStatementNumArray(statementNumArray);
                      setStatements(result);
                    });
                }

                // HANDLE SORTS
                if (filename === "sorts.txt") {
                  zip.files["sorts.txt"]
                    .async("string")
                    .then(function (fileData: string) {
                      const result = parseKade(fileData);
                      numberSorts = result.length;

                      participantNames = createParticipantNameArray(result);
                      ///  console.log(JSON.stringify(participantNames));

                      let rawSorts = createRawSorts(result);
                      // console.log(JSON.stringify(rawSorts));

                      mainDataObject = createMainDataObject(
                        participantNames,
                        rawSorts
                      );
                      // console.log(JSON.stringify(mainDataObject));

                      sortDisplayText = sortsDisplayText(mainDataObject);
                      // console.log(JSON.stringify(sortDisplayText));
                    })
                    .then(function () {
                      setRespondentNames(participantNames);
                      setNumQsorts(numberSorts);
                      setMainDataObject(mainDataObject);
                      setSortsDisplayText(sortDisplayText);
                    });
                }

                // HANDLE PATTERN
                if (filename === "pattern.txt") {
                  let sortPattern: Array<string | number>[];
                  zip.files["pattern.txt"]
                    .async("string")
                    .then(function (fileData: string) {
                      sortPattern = parseKade(fileData);

                      multiplierArray = modifySortPattern(sortPattern);
                      // console.log(JSON.stringify(multiplierArray));

                      qSortPatternArray =
                        calcQsortPatternArray(multiplierArray);
                      // console.log(JSON.stringify(qSortPatternArray));

                      setMultiplierArray(multiplierArray);
                      setQSortPattern(qSortPatternArray);
                    });
                }

                // HANDLE NAME
                if (filename === "name.txt") {
                  zip.files["name.txt"]
                    .async("string")
                    .then(function (fileData: string) {
                      setProjectName(fileData);
                      // console.log(fileData);
                    });
                }

                // HANDLE MINMAX
                /*
                if (filename === "minmax.txt") {
                  let minMax: Array<string | number>[];
                  zip.files["minmax.txt"]
                    .async("string")
                    .then(function (fileData: string) {
                      minMax = parseKade(fileData);
                      let minMax2: Array<number> = minMax[0].map(
                        (element: any, index: number) => {
                          if (index === 0) {
                            return parseInt(element, 10);
                          } else {
                            return element;
                          }
                        }
                      );
                      // console.log(JSON.stringify(minMax2));
                    });
                  }
                  */
              });
            });
            setHasImportedSorts(true);
            setHasImportedStatements(true);
            props.updateColor();
            setIsDataLoaded(true);
          } catch (error: any) {
            console.log(error.message);
          }
        };
        reader.readAsText(file);
      });
    },
    [
      isDataLoaded,
      setIsDataLoaded,
      setShowInputErrorModal,
      setProjectName,
      setStatements,
      setQSortPattern,
      setDataOrigin,
      setNumStatements,
      setNumQsorts,
      setSortsDisplayText,
      setMainDataObject,
      setMultiplierArray,
      setStatementNumArray,
      setRespondentNames,
      setHasImportedSorts,
      setHasImportedStatements,
      setExcelErrorMessage1,
      setShowExcelErrorModal,
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
      <p>Drag and drop KADE file here, or click to select file</p>
    </div>
  );
};

export default FileUpload;
