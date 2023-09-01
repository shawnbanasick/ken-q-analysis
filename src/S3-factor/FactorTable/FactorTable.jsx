import React from "react";
import { AgGridReact } from "ag-grid-react";
import S1DataSlice from "../../State/S1DataSlice";
import S3DataSlice from "../../State/S3DataSlice";
import S2DataSlice from "../../State/S2DataSlice";
// import S5DataSlice from "../../State/S5DataSlice";

// let containerStyle = {
//   marginTop: 30,
//   // height: 400,
//   width: 922
// };

const UnRotFacTable = () => {
  /*
  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };
*/
  const { numQsorts } = S1DataSlice();

  const { gridColDefsFactorTable, gridRowDataFactorTable, numFacsExtracted } =
    S3DataSlice();

  const { firstColMaxWidth } = S2DataSlice();
  // const { numFactorsKeptForRot } = S4DataSlice();

  // let { bipolarSplitCount } = S5DataSlice();

  let gridOptions = {
    suppressRowHoverHighlight: false,
    // turns ON column hover, it's off by default
    columnHoverHighlight: true,
  };

  // let numFacsFromState = numFacsExtracted;
  // let bipolarSplitCount1 = bipolarSplitCount;
  let numFacsForTableWidth = numFacsExtracted;

  /***************************************
   ** TABLE WIDTH / HEIGHT CALCULATIONS **
   ***************************************/

  function getHeight(numQsorts) {
    let heightVal1 = 40 + 25 * numQsorts;
    let heightVal2 = window.innerHeight - 270;
    if (heightVal1 < heightVal2) {
      heightVal1 += "px";
      return heightVal1;
    }
    heightVal2 += "px";
    return heightVal2;
  }

  const resetWidthAndHeight = () => {
    const table = document.querySelector("#loadingsTableContainer");
    if (table !== null) {
      table.style.width = getWidth(numFacsForTableWidth);
      table.style.height = getHeight(numQsorts);
    }
  };

  // set table width and height
  function getWidth(numFacsForTableWidth) {
    // num col + first col width + numFacs * 90 + 20 (chrome adjustment)
    let tableWidth = 80 + firstColMaxWidth + 90 * numFacsForTableWidth + 20;
    let windowWidth = window.innerWidth - 140;

    if (windowWidth < tableWidth) {
      windowWidth += "px";
      return windowWidth;
    }
    tableWidth += "px";
    return tableWidth;
  }

  window.addEventListener("resize", () => {
    resetWidthAndHeight();
  });

  // pull number factors to calc responsive table width
  // numFacsForTableWidth = Number(numFacsFromState);
  // increase height / width when bipolar split present
  // bipolarSplitCount = Number(bipolarSplitCount1);
  // increase width if bipolar present
  //if (bipolarSplitCount > 0) {
  //    numFacsForTableWidth += bipolarSplitCount;
  //  }

  const unRotFacTableContainerStyle = {
    marginTop: 30,
    height: getHeight(numQsorts),
    width: getWidth(numFacsForTableWidth),
    marginBottom: 15,
  };
  /*
  let widthVal = 80 + 202 + 80 * numFacsForTableWidth;
  if (widthVal > window.innerWidth - 100) {
    widthVal = window.innerWidth - 100;
  }
  widthVal = widthVal + "px";
*/
  return (
    <div>
      <div
        style={{ ...unRotFacTableContainerStyle }}
        className="ag-theme-fresh w-full border border-gray-400"
      >
        <AgGridReact
          // properties
          columnDefs={gridColDefsFactorTable}
          rowData={gridRowDataFactorTable}
          gridOptions={gridOptions}
          animateRows={true}
          // events
          enableSorting={true}
        />
      </div>
    </div>
  );
};

export default UnRotFacTable;
