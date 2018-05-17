import React, { Component } from "react";
import S0GrayBox from "./S0-info/S0GrayBox";
import "./Utils/ag-grid.css";
import "./Utils/theme-fresh.css";
import { easyComp } from "react-easy-state";
import S1GrayBox from "./S1-data/S1GrayBox";
import S2GrayBox from "./S2-corr/S2GrayBox";
import S3GrayBox from "./S3-factor/S3GrayBox";
import S4GrayBox from "./S4-rotation/S4GrayBox";
import S5GrayBox from "./S5-loadings/S5GrayBox";
import S6GrayBox from "./S6-results/S6GrayBox";
import S7GrayBox from "./S7-Legal/S7GrayBox";
import { default as ConsoleLogStateButton } from "./ConsoleLogStateButton";

class App extends Component {
    render() {
        window.onbeforeunload = function() {
            sessionStorage.clear();
            window.scrollTo(0, 0);
            return "";
        };

        return (
            <div className="App">
              <S0GrayBox />
              <S1GrayBox />
              <S2GrayBox />
              <S3GrayBox />
              <S4GrayBox />
              <S5GrayBox />
              <S6GrayBox />
              <S7GrayBox />
              <ConsoleLogStateButton />
            </div>
            );
    }
}

export default easyComp(App);
