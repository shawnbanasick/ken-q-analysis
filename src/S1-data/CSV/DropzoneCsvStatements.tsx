import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import S1DataSlice from "../../State/S1DataSlice";
import ErrorMessageSlice from "../../State/ErrorMessageSlice";

// const handleDropRejected = (...args) => console.log("reject", args);

const FileUpload = () => {
  const { setStatements } = S1DataSlice();

  const { setExcelErrorMessage1, setShowExcelErrorModal } = ErrorMessageSlice();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        let lines2: string[];
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

            if (lines2.length < 1) {
              throw new Error("Can't find any statements in the file!");
            }

            console.log(JSON.stringify(lines2));

            // send data to STATE
          } catch (error: any) {
            console.log(error.message);
          }
          setStatements(lines2);
        };
        reader.readAsText(file);
      });
    },
    [setStatements, setExcelErrorMessage1, setShowExcelErrorModal]
  );
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
