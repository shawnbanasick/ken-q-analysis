import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import S1DataSlice from "../../State/S1DataSlice";
import ErrorMessageSlice from "../../State/ErrorMessageSlice";

// const handleDropRejected = (...args) => console.log("reject", args);
const FileUpload = (props: any) => {
  const {
    isDataLoaded,
    sortsAreLoaded,
    setStatements,
    setStatementNumArray,
    setNumStatements,
    setHasImportedStatements,
    setIsDataLoaded,
    setShowInputErrorModal,
    setStatementsAreLoaded,
  } = S1DataSlice();

  const { setExcelErrorMessage1, setShowExcelErrorModal } = ErrorMessageSlice();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        if (isDataLoaded) {
          setShowInputErrorModal({
            showModal: true,
            titleText: "Data Loading Error",
            bodyText: "Data are already loaded.",
            bodyText2: "Reload the webpage to start a new project.",
          });
          return;
        }

        let lines2: string[];
        let statementNumArray: number[] = [];
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
            const fileString: any = reader.result;

            let lines = fileString.split(/[\r\n]+/g);
            // remove empty strings
            let lines3 = lines.filter(function (e: any) {
              return e === 0 || e;
            });

            lines2 = lines3.map((item: string) => item.trim());

            for (let i = 0; i < lines2.length; i++) {
              statementNumArray.push(i + 1);
            }

            if (lines2.length < 1) {
              throw new Error("Can't find any statements in the file!");
            }

            // send data to STATE
          } catch (error: any) {
            console.log(error.message);
          }
          setStatements(lines2);
          setStatementNumArray(statementNumArray);
          setNumStatements(lines2.length);
          setHasImportedStatements(true);
          props.updateColor();

          setStatementsAreLoaded(true);
          if (sortsAreLoaded) {
            setIsDataLoaded(true);
          }
        };
        reader.readAsText(file);
      });
    },
    [
      isDataLoaded,
      sortsAreLoaded,
      setStatements,
      setExcelErrorMessage1,
      setShowExcelErrorModal,
      setNumStatements,
      setStatementNumArray,
      setHasImportedStatements,
      setIsDataLoaded,
      setShowInputErrorModal,
      setStatementsAreLoaded,
      props,
    ]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex justify-center pt-5 items-center" {...getRootProps()}>
      <input className="" {...getInputProps()} />
      <p>Drag and drop STA file here, or click to select</p>
    </div>
  );
};

export default FileUpload;

/*



import React, { useCallback } from "react";
import "./Dropzone.css";
import { useDropzone } from "react-dropzone";

import S1DataSlice from "../../../State/S1DataSlice";

const handleDropRejected = (...args) => console.log("reject", args);

const FileUpload = () => {
  
    const { setStatements, setNumStatements, setStatementNumArray } =
    S1DataSlice();
  
    const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        // parse blob by new line
        let lines = fileAsBinaryString.split(/[\r\n]+/g);
        // remove empty strings
        let lines2 = lines.filter(function (e) {
          return e === 0 || e;
        });

        let statementNumArray = [];
        for (let i = 0; i < lines2.length; i++) {
          statementNumArray.push(i + 1);
        }
        // send data to STATE
        setStatements(lines2);
        setNumStatements(lines2.length);
        setStatementNumArray(statementNumArray);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.readAsBinaryString(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="flex justify-center items-center pt-[20px]"
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} />
      <p>Drag and drop Statements text file here, or click to select</p>
    </div>
  );
};

export default FileUpload;

*/
