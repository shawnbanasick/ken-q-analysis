import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import S0GrayBox from "./S0-info/S0GrayBox";
import S1GrayBox from "./S1-data/S1GrayBox";
import S2GrayBox from "./S2-corr/S2GrayBox";
import S3GrayBox from "./S3-factor/S3GrayBox";
import S4GrayBox from "./S4-rotation/S4GrayBox";
import S5GrayBox from "./S5-loadings/S5GrayBox";
import S6GrayBox from "./S6-results/S6GrayBox";
import ErrorBoundary from "./Utils/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-6 p-4 bg-neutral-100">
        <S0GrayBox />
        <S1GrayBox />
        <S2GrayBox />
        <S3GrayBox />
        <S4GrayBox />
        <S5GrayBox />
        <S6GrayBox />
      </div>
    </ErrorBoundary>
  );
}

export default App;
