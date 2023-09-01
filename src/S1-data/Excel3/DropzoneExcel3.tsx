import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../dataUtilities/Dropzone.css";
import parseExcelType3 from "./parseExcelType3";
import S1DataSlice from "../../State/S1DataSlice";

// const handleDropRejected = (...args) => console.log("reject", args);

export default function MyDropzone() {
  const {
    setNumQsorts,
    setQSortPattern,
    setNumStatements,
    setRespondentNames,
    setMainDataObject,
    setSortsDisplayText,
    setMultiplierArray,
    setDataOrigin,
    setStatements,
    setProjectName,
    setProjectHistoryArray,
    setStatementNumArray,
    setExcelType1NonsymmetricArrayText,
    setHasImportedSorts,
    setHasImportedStatements,
  } = S1DataSlice();

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const data = await parseExcelType3(acceptedFiles);

      setNumQsorts(data.numQsorts);
      setProjectName(data.projectName);
      setQSortPattern([...data.qSortPattern]);
      setNumStatements(data.numStatements);
      setStatements([...data.statements]);
      setRespondentNames([...data.respondentNames]);
      setMainDataObject([...data.mainDataObject]);
      setSortsDisplayText([...data.sortsDisplayText]);
      setMultiplierArray([...data.multiplierArray]);
      setDataOrigin("excel");
      setProjectHistoryArray([...data.projectHistoryArray]);
      setStatementNumArray([...data.statementNumArray]);
      setExcelType1NonsymmetricArrayText(data.excelType1NonsymmetricArrayText);
      setHasImportedSorts(true);
      setHasImportedStatements(true);
    },
    [
      setNumQsorts,
      setProjectName,
      setQSortPattern,
      setNumStatements,
      setStatements,
      setRespondentNames,
      setMainDataObject,
      setSortsDisplayText,
      setMultiplierArray,
      setDataOrigin,
      setProjectHistoryArray,
      setStatementNumArray,
      setExcelType1NonsymmetricArrayText,
      setHasImportedSorts,
      setHasImportedStatements,
    ]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      className="flex justify-center items-center pt-[20px]"
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} />
      <p>Drag and drop Excel file here, or click to select</p>
    </div>
  );
}

/*
class FileUpload extends Component {
  handleDrop(acceptedFiles) {
    parseExcelType3(acceptedFiles);
  }

  render() {
    return (
      <section>
        <Dropzone
          onDrop={this.handleDrop}
          multiple={false}
          onDropRejected={handleDropRejected}
        >
          Drag a file here or
          <br /> click to load.
        </Dropzone>
      </section>
    );
  }
}

export default FileUpload;
*/
