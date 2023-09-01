import React from "react";
import { AgGridReact } from "ag-grid-react";
import S3DataSlice from "../../State/S3DataSlice";
// let containerStyle = {
//   marginTop: 30,
//   height: 200,
//   width: 862
// };

const EigenTable = () => {
  /*
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  };
  */

  const {
    gridColDefsFacTableEigen,
    gridRowDataFacTableEigen,
    numFacsExtracted,
  } = S3DataSlice();

  let widthVal = 267 + numFacsExtracted * 90;
  if (widthVal > window.innerWidth - 100) {
    widthVal = window.innerWidth - 100;
  }
  widthVal = widthVal + "px";

  let gridOptions = {
    suppressRowHoverHighlight: false,
    // turns ON column hover, it's off by default
    columnHoverHighlight: true,
  };

  return (
    <div className=" mb-16 mt-12 ">
      <div
        style={{ width: widthVal }}
        className="ag-theme-fresh border border-gray-400"
      >
        <AgGridReact
          columnDefs={gridColDefsFacTableEigen}
          rowData={gridRowDataFacTableEigen}
          domLayout={"autoHeight"}
          enableSorting={true}
          gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default EigenTable;
