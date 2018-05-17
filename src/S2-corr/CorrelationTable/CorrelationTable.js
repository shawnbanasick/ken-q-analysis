import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { AgGridReact } from "ag-grid-react";
// import { Transition } from "semantic-ui-react";

class CorrelationTable extends Component {
  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  // this.gridApi.sizeColumnsToFit();
  };

  render() {
    let numQsorts = store.getState("numQsorts");
    let widthVal = 152 + 75 * numQsorts;
    if (widthVal > window.innerWidth - 100) {
      widthVal = window.innerWidth - 100;
    }
    widthVal = widthVal + "px";
    let gridColDefs = store.getState("gridColDefs");
    let gridRowData = store.getState("gridRowData");
    let showCorrelationMatrix = store.getState("showCorrelationMatrix");

    const {onGridReady} = this;

    if (showCorrelationMatrix) {
      return (
        <div>
          <p style={ { fontWeight: "normal", marginTop: 15, textAlign: "left" } }>
            Click the table headers to re-sort by column (low-to-high, high-to-low, original sort).
          </p>
          <div style={ { width: widthVal } } className="ag-fresh">
            <AgGridReact columnDefs={ gridColDefs } rowData={ gridRowData } onGridReady={ onGridReady } domLayout={ "autoHeight" } enableSorting={ true }
            />
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

export default easyComp(CorrelationTable);
