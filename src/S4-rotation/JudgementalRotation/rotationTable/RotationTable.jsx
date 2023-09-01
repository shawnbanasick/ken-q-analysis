import React from "react";
import { AgGridReact } from "ag-grid-react";
// import { AllCommunityModules } from "@ag-grid-community/all-modules";
import S2DataSlice from "../../../State/S2DataSlice";

const RotationTable = (props) => {
  // const onGridReady = params => {
  //   gridApi = params.api;
  //   columnApi = params.columnApi;
  // };

  const { colMaxWidth } = S2DataSlice();

  let gridOptions = {
    suppressRowHoverHighlight: false,
    // turns ON column hover, it's off by default
    columnHoverHighlight: true,
  };

  // getState
  const rowData = props.rowData;
  const colDefs = props.colDefs;
  const maxHeight = props.maxHeight;
  let heightVal = rowData.length * 28 + 13;

  if (heightVal > maxHeight) {
    heightVal = maxHeight;
  }

  const containerStyle = {
    marginTop: 10,
    height: heightVal,
    width: +colMaxWidth + 405,
  };

  return (
    <div>
      <p style={{ marginTop: 15, fontWeight: 300, fontSize: 14 }}>
        Highlighting levels are set by the flagging options in Section 5
      </p>
      <div
        style={containerStyle}
        className="ag-theme-fresh border border-gray-400"
      >
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          gridOptions={gridOptions}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default RotationTable;

/*
modules={AllCommunityModules}
*/
