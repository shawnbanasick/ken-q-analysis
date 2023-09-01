import React from "react";

const styles = {
  fill: "white",
  stroke: "black",
  strokeWidth: 1.5,
};

const renderCircles = (props) => (coords, index) => {
  const circleProps = {
    cx: props.xScale(coords[0]),
    cy: props.yScale(coords[1]),
    r: 3.5,
    key: index,
  };
  return <circle {...styles} {...circleProps} />;
};

const DataCircles2 = (props) => <g>{props.data.map(renderCircles(props))}</g>;

export default DataCircles2;
