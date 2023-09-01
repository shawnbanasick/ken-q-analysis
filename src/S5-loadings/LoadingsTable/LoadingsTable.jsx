import React, { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SigLevelDropdown from "./SigLevelDropdown";
import InvertFactorButton from "./InvertFactorButton";
import SplitBipolarFactorModal from "./SplitBipolarFactorModal";
import MajorityCommonVarianceCheckbox from "./MajorityCommonVarianceCheckbox";
import S1DataSlice from "../../State/S1DataSlice";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";
import generateOutputFromLoadingTable from "./generateOutputFromLoadingTable";
import splitBipolarFactor from "../loadingsLogic/splitBipolarFactor";
import invertFactor from "../loadingsLogic/invertFactor";
import doNewAutoflagging from "../loadingsLogic/doNewAutoflagging";
import "ag-grid-community/styles/ag-grid.css";
import setAutoflagHistory from "../loadingsLogic/setAutoflagHistory";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const LoadingsTable = () => {
  const { numQsorts } = S1DataSlice();
  let {
    /*
    autoflagButtonColor,
    isLoadingsTableInitialRender,
    setTemp_gridColDefsLoadingsTable,
    setIsLoadingsTableInitialRender,
    setGridRowDataLoadingsTable,
    setShowSplitFactorModal,
    setNumFacsForTableWidth,
    setAutoflagButtonColor,
    */
    sendDataToOutputButtonColor,
    bipolarDisabled,
    gridColDefsLoadingsTable,
    gridRowDataLoadingsTable,
    bipolarSplitCount,
    setTemp_gridRowDataLoadingsTable,
    setGridColDefsLoadingsTable,
    setSendDataToOutputButtonColor,
    setCurrentLoadingsTable,
    setShowInvertFactorModal,
    setHighlighting,
    setShowSection6,
  } = S5DataSlice();

  const {
    setShowOutputFactorSelection,
    setShowFactorCorrelationsTable,
    setShowStandardErrorsDifferences,
    setShowFactorCharacteristicsTable,
    setShowDownloadOutputButtons,
    setShouldDisplayFactorVizOptions,
    setDisplayFactorVisualizations,
    setOutputButtonsArray,
  } = S6DataSlice();

  const { numFactorsKeptForRot } = S4DataSlice();

  const gridRef = useRef();

  let numFacsFromState = numFactorsKeptForRot;
  let bipolarSplitCount1 = bipolarSplitCount;
  const isDisabled = bipolarDisabled;

  let numFacsForTableWidth = numFactorsKeptForRot;

  const gridApi = useRef();

  const onGridReady = (params) => {
    gridApi.current = params.api;
    // gridApi.current.sizeColumnsToFit();
  };

  // helper function for filtering btnId when table loads => output buttons
  const filterArray = (item) => {
    let shortened = item;
    shortened = shortened.substring(0, 6);
    if (shortened === "factor") {
      return item;
    }
    return null;
  };

  /***************************************
   ** TABLE WIDTH / HEIGHT CALCULATIONS **
   ***************************************/

  const resetWidthAndHeight = () => {
    const table = document.querySelector("#loadingsTableContainer");
    if (table !== null) {
      table.style.width = getWidth(numFacsForTableWidth);
      table.style.height = getHeight(numQsorts);
    }
  };

  // set table width and height
  function getWidth(numFacsForTableWidth) {
    let tableWidth = 310 + 15 + 128 * numFacsForTableWidth + 12;
    let windowWidth = window.innerWidth - 140;

    if (windowWidth < tableWidth) {
      windowWidth += "px";
      return windowWidth;
    }

    tableWidth += "px";
    return tableWidth;
  }

  function getHeight(numQsorts) {
    let heightVal1 = 40 + 25 * numQsorts + 20;
    let heightVal2 = window.innerHeight - 230;
    if (heightVal1 < heightVal2) {
      heightVal1 += "px";
      return heightVal1;
    }
    heightVal2 += "px";
    return heightVal2;
  }

  window.addEventListener("resize", () => {
    resetWidthAndHeight();
  });

  useEffect(() => {
    const resetWidthAndHeight = () => {
      const table = document.querySelector("#loadingsTableContainer");
      if (table !== null) {
        table.style.width = getWidth(numFacsForTableWidth);
        table.style.height = getHeight(numQsorts);
      }
    };

    window.addEventListener("resize", () => {
      resetWidthAndHeight();
    });

    return () => {
      window.removeEventListener("resize", () => {
        resetWidthAndHeight();
      });
    };
  }, [numFacsForTableWidth, numQsorts]);

  // pull number factors to calc responsive table width
  numFacsForTableWidth = Number(numFacsFromState);
  // increase height / width when bipolar split present
  bipolarSplitCount = Number(bipolarSplitCount1);
  // increase width if bipolar present
  if (bipolarSplitCount > 0) {
    numFacsForTableWidth += bipolarSplitCount;
  }

  const loadingsTableContainerStyle = {
    marginTop: 2,
    height: getHeight(numQsorts),
    width: getWidth(numFacsForTableWidth),
    marginBottom: 15,
    padding: 0,
  };

  /***************************************
   ** END TABLE WIDTH / HEIGHT CALCULATIONS **
   ***************************************/

  // *** Problematic state writes
  // setNumFacsForTableWidth(numFacsForTableWidth);
  // setSendDataToOutputButtonColor(sendDataToOutputButtonColor);
  // setAutoflagButtonColor(autoflagButtonColor);

  // *** notification of table data sent to output ***
  function notify() {
    toast.success("Data sent to Output", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
    S5DataSlice.setState({ notifyDataSentToOutputSuccess: false });
  }

  function notifyInvert(facNum) {
    toast.success(`Factor ${facNum} Inverted`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
    S5DataSlice.setState({ notifyDataSentToOutputSuccess: false });
  }

  const grabTableLocalState = () => {
    // grab current table data (including user-added flags)
    const currentLoadingsTable = [];
    gridApi.current.forEachNode((rowNode) => {
      currentLoadingsTable.push(rowNode.data);
    });
    return currentLoadingsTable;
  };

  // todo - fix this hack - button color shifted to different listener
  const updateTableLocalState = () => {
    const currentLoadingsTable = grabTableLocalState();
    setTemp_gridRowDataLoadingsTable(currentLoadingsTable);
    setShowOutputFactorSelection(false);
    setShowFactorCorrelationsTable(false);
    setShowStandardErrorsDifferences(false);
    setShowFactorCharacteristicsTable(false);
    setShowDownloadOutputButtons(false);
    setShouldDisplayFactorVizOptions(false);
    setDisplayFactorVisualizations(false);
  };

  // Control output button color
  const changeOutputButtonColor = () => {
    setSendDataToOutputButtonColor("bg-orange-300");
  };

  /********************************
   ** BUTTON FUNCTIONS **
   ********************************/

  // *** OUTPUT BUTTONS ***
  const generateOutput = () => {
    // grab current table data
    const currentLoadingsTable = grabTableLocalState();
    // send current to local state
    // setTemp_gridRowDataLoadingsTable(currentLoadingsTable);

    // todo - OUTPUT BUTTONS --- create output buttons array here to stay in sync, but do performance check
    const outputButtonsArray2 = gridColDefsLoadingsTable.map(
      (item) => item.field
    );
    const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
    outputButtonsArray3.shift();
    const outputButtonsArray = outputButtonsArray3.map((item) => item.slice(6));
    // todo - fix this - delay to avoid react update error - can't update while rendering

    setShowOutputFactorSelection(true);
    generateOutputFromLoadingTable(currentLoadingsTable);
    // setOutputButtonsArray(outputButtonsArray);
    notify();
    setTimeout(function () {
      setOutputButtonsArray(outputButtonsArray);
    }, 100);
    setSendDataToOutputButtonColor("bg-green-300");
    setShowSection6(true);
  };

  const doSplitFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    setCurrentLoadingsTable(currentLoadingsTable);
    let newData = splitBipolarFactor();
    setGridColDefsLoadingsTable(newData[0]);
    gridRef.current.api.setColumnDefs(newData[0]);
    gridApi.current.setRowData(newData[1]);
  };

  const doInvertFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    setShowInvertFactorModal(true);
    setCurrentLoadingsTable(currentLoadingsTable);
    let processFactor = invertFactor();
    if (processFactor !== undefined) {
      notifyInvert(processFactor);
    }
  };

  const doAutoflag = () => {
    const currentLoadingsTable = grabTableLocalState();
    let flaggedSorts = doNewAutoflagging(currentLoadingsTable);
    gridApi.current.setRowData(flaggedSorts);
    setSendDataToOutputButtonColor("bg-orange-300");
    setAutoflagHistory();
  };

  const flagAllQsorts = () => {
    const currentLoadingsTable = grabTableLocalState();
    // getState
    const factorGroupArray = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"];
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      const factorGroup = currentLoadingsTable[i].factorGroup.slice(0, 2);
      const factorGroupIndexValue = factorGroupArray.indexOf(factorGroup);
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        const checkboxIndex = `check${k + 1}`;
        if (factorGroupIndexValue === k) {
          currentLoadingsTable[i][checkboxIndex] = true;
        } else {
          currentLoadingsTable[i][checkboxIndex] = false;
        }
      }
    }
    gridApi.current.setRowData(currentLoadingsTable);
    // setTemp_gridRowDataLoadingsTable(currentLoadingsTable);
    // setGridRowDataLoadingsTable(currentLoadingsTable);
    setSendDataToOutputButtonColor("bg-orange-300");
  };

  const clearAllCheckboxes = () => {
    const currentLoadingsTable = grabTableLocalState();
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        const index = `check${k + 1}`;
        currentLoadingsTable[i][index] = false;
      }
    }
    gridApi.current.setRowData(currentLoadingsTable);
    // setTemp_gridRowDataLoadingsTable(currentLoadingsTable);
    // setGridRowDataLoadingsTable(currentLoadingsTable);
    setSendDataToOutputButtonColor("bg-gray-100");
  };

  /********************************
   ** ROW HIGHLIGHTING **
   ********************************/
  // requires loadingTable.css in index.html
  const highlightRows = (highlightType) => {
    const currentLoadingsTable2 = [];
    //const count = gridApi.current.getDisplayedRowCount();
    gridApi.current.forEachNode((rowNode) => {
      // const rowNode = gridApi.current.getDisplayedRowAtIndex(i);
      const holder = rowNode.data.highlightingClass;
      const holder2 = holder.slice(0, 2);
      const holder3 = `${holder2}${highlightType}`;
      rowNode.data.highlightingClass = holder3;
      currentLoadingsTable2.push(rowNode.data);
    });
    // gridApi.current.redrawRows => setRowData
    gridApi.current.setRowData(currentLoadingsTable2);
    // autoflagButtonColor;
    // setGridRowDataLoadingsTable(currentLoadingsTable2);
    // gridApi.current.applyTransaction({ update: currentLoadingsTable2 });
    setHighlighting(highlightType);
  };

  /********************************
   ** ROW RENDERING AND STATE **
   ********************************/

  let gridOptions = {
    suppressRowHoverHighlight: false,
    // turns ON column hover, it's off by default
    columnHoverHighlight: true,
  };

  return (
    <div>
      <div className="flex flex-col items-center outline-blue-300 max-w-[1350px]">
        <ToastContainer transition={Zoom} />
        <div className="grid grid-cols-2 w-[1100px]">
          <p className="text-xl">Row Highlighting</p>
          <p className="text-xl">Flagging</p>
        </div>
        <div className="grid grid-cols-2 w-[1100px]outline-red-400">
          <div className="flex flex-row">
            <OnGrayGeneralButton
              handleClick={() => highlightRows("none")}
              buttonText="None"
              buttonColor="bg-gray-100"
              otherFormatting="m-1 ml-4 mr-2"
              disabled={isDisabled}
            />
            <OnGrayGeneralButton
              handleClick={() => highlightRows("colors")}
              buttonText="Color"
              buttonColor="bg-gray-100"
              otherFormatting="m-1 ml-4 mr-2"
              disabled={isDisabled}
            />
            <OnGrayGeneralButton
              handleClick={() => highlightRows("grays")}
              buttonText="Gray"
              buttonColor="bg-gray-100"
              otherFormatting="m-1 ml-4 mr-8"
              disabled={isDisabled}
            />
          </div>

          <div className="flex flex-row items-center">
            <OnGrayGeneralButton
              buttonId="autoflagButton"
              buttonText="Auto-flag"
              buttonColor="bg-gray-100"
              disabled={isDisabled}
              handleClick={doAutoflag}
              otherFormatting="m-1 ml-4 mr-4"
            />

            <span className="mr-4">at</span>
            <SigLevelDropdown
              clearAllCheckboxes={clearAllCheckboxes}
              data={"allData"}
            />
            <OnGrayGeneralButton
              handleClick={flagAllQsorts}
              buttonText="All"
              buttonColor="bg-gray-100"
              otherFormatting="m-1 ml-8 mr-4"
              disabled={isDisabled}
            />
            <OnGrayGeneralButton
              handleClick={clearAllCheckboxes}
              buttonText="None"
              buttonColor="bg-gray-100"
              otherFormatting="m-1 ml-4 mr-8"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className="flex flex-row w-[900px]outline-purple-300 justify-center ">
          <div className="ml-[330px]">
            <MajorityCommonVarianceCheckbox
              clearAllCheckboxes={clearAllCheckboxes}
            />
          </div>
        </div>
        <div className="flex flex-col items-centeroutline-green-400">
          <div className="flex flex-row w-[900px">
            <p className="mt-4 text-left">
              Default sort is by factor group FG highest loading factor
            </p>
            <p className="mt-4 text-left ml-24">
              Click the column headers to resort
            </p>
          </div>
          <div
            id="loadingsTableContainer"
            style={loadingsTableContainerStyle}
            className="ag-theme-fresh border border-gray-400"
          >
            <AgGridReact
              id="loadingsTable"
              // ref={gridApi}
              columnDefs={gridColDefsLoadingsTable}
              animateRows={true}
              rowData={gridRowDataLoadingsTable}
              getRowClass={(params) => params.data.highlightingClass}
              onGridReady={onGridReady}
              onCellClicked={updateTableLocalState}
              onCellFocused={changeOutputButtonColor}
              gridOptions={gridOptions}
              ref={gridRef}
              scrollbarWidth="10"
            />
          </div>
        </div>
        <div className="flex flex-row justify-centeroutline-blue-300 space-x-4 w-[910px]">
          <OnGrayGeneralButton
            buttonId="generateOutputButton"
            handleClick={generateOutput}
            buttonText="Send Table Data to Output"
            buttonColor={sendDataToOutputButtonColor}
            otherFormatting="m-1 ml-4 mr-[300px]"
          />
          <InvertFactorButton handleClick={doInvertFactor} />
          <SplitBipolarFactorModal handleClick={doSplitFactor} />
        </div>
      </div>
    </div>
  );
};

export default LoadingsTable;

/*

 modules={AllCommunityModules}


/*
99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28
*/
