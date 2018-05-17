import React, { Component } from "react";
import S2Header from "./S2Header";
// import "./S2GrayBox.css";
// import store from "../store";
// import { connect } from "redux-zero";

import { default as CorrelationTable } from "./CorrelationTable/CorrelationTable";

class S2GrayBox extends Component {
    render() {
        return (
            <div className="section">
              <S2Header />
              <CorrelationTable />
              <div style={ { height: "300px", width: "500px" } } />
            </div>
            );
    }
}

export default S2GrayBox;
