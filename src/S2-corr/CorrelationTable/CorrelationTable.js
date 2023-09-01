import React from "react";
import { AgGridReact } from "ag-grid-react";
import S1DataSlice from "../../State/S1DataSlice";
import S2DataSlice from "../../State/S2DataSlice";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CorrelationTable = () => {
  /*
  const { onGridReady } = this;
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  };
*/

  const { numQsorts } = S1DataSlice();
  const { gridColDefs, gridRowData, showCorrelationMatrix } = S2DataSlice();

  let gridOptions = {
    suppressRowHoverHighlight: false,
    // turns ON column hover, it's off by default
    columnHoverHighlight: true,
  };
  let heightVal = 29 * numQsorts;
  if (heightVal > 700) {
    heightVal = 700;
  }

  let widthVal = 185 + 75 * numQsorts;
  if (widthVal > 1200) {
    widthVal = 1400;
  }

  if (widthVal > window.innerWidth - 100) {
    widthVal = window.innerWidth - 100;
  }

  widthVal = widthVal + "px";
  //let heightVal = 80vh;

  if (showCorrelationMatrix) {
    return (
      <div className="">
        <div
          style={{ width: widthVal, height: heightVal }}
          className={`ag-theme-fresh mb-8 mt-4 w-full h-[${heightVal}px]`}
        >
          <AgGridReact
            columnDefs={gridColDefs}
            gridOptions={gridOptions}
            rowData={gridRowData}
            // onGridReady={onGridReady}
            animateRows={true}
            enableSorting={true}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CorrelationTable;
