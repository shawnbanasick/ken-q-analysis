import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import S1DataSlice from "../../State/S1DataSlice";
import "../dataUtilities/Dropzone.css";
import parseExcelType1 from "./parseExcelType1";
// import { setAriaDisabled } from "ag-grid-community/dist/lib/utils/aria";
// todo - convert css to tailwind

export default function MyDropzone(props: any) {
  const {
    isDataLoaded,
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
    setIsDataLoaded,
    setShowInputErrorModal,
  } = S1DataSlice();

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      if (isDataLoaded) {
        setShowInputErrorModal({
          showModal: true,
          titleText: "Data Loading Error",
          bodyText: "Data are already loaded.",
          bodyText2: "Reload the webpage to start a new project.",
        });
        return;
      }

      try {
        const data: any = await parseExcelType1(acceptedFiles);
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
        setExcelType1NonsymmetricArrayText(
          data.excelType1NonsymmetricArrayText
        );
        setHasImportedSorts(true);
        setHasImportedStatements(true);
        props.updateColor();
        setIsDataLoaded(true);
      } catch (error: any) {
        S1DataSlice.setState({ showWarningBox: true });
        console.log(error.message);
        alert(`${error.message} 
        There is an unexpected Excel input error. Check your Excel file, reload the webpage, and try again`);
      }
    },
    [
      isDataLoaded,
      setIsDataLoaded,
      setShowInputErrorModal,
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
      props,
    ]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      className={`flex justify-center items-center pt-[20px]`}
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} />
      <p>Drag and drop Excel file here, or click to select</p>
    </div>
  );
}
