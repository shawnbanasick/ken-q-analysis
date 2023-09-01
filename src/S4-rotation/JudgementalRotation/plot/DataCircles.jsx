import React from "react";
import S4DataSlice from "../../../State/S4DataSlice";

const styles = {
  // fill: "white",
  stroke: "black",
  strokeWidth: 0.5,
  // zindex: 99
};

const getFillColor = (data) => {
  if (data.factor1Sig === true) {
    return "#b4dffe"; // "aquamarine"; // "#ffe4b2";
  }
  if (data.factor2Sig === true) {
    return "#ffe4b2";
  }
  return "#d3d3d3";
};

const showPopUp = function (info) {
  S4DataSlice.setState({ participantDataObject: info });
};

const closePopUp = function () {
  S4DataSlice.setState({
    participantDataObject: { respondent: "doNotDisplay" },
  });
};

const renderCircles = (props) => (coords, index) => {
  const circleProps = {
    cx: props.xScale(props.data[index].factor2),
    cy: props.yScale(props.data[index].factor1),
    r: 9,
    key: props.data[index].num,
    fill: getFillColor(props.data[index]),
    text: props.data[index].num,
    // on:("mouseover", showPopUp())
  };
  return (
    <circle
      onMouseOver={() => showPopUp(props.data[index])}
      onMouseOut={() => closePopUp()}
      {...styles}
      {...circleProps}
    />
  );
};

const DataCircles1 = (props) => <g>{props.data.map(renderCircles(props))}</g>;

export default DataCircles1;
