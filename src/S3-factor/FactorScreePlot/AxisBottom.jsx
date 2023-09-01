import React from "react";
import * as d3 from "d3";
import S3DataSlice from "../../State/S3DataSlice";

export default class AxisBottom extends React.Component {
  componentDidMount() {
    let facNum = Number(S3DataSlice.getState().numCentroidFactors) + 1;
    if (facNum > 8) {
      facNum = 8;
    }
    this.renderAxis(facNum);
  }

  componentDidUpdate() {
    let facNum = Number(S3DataSlice.getState().numCentroidFactors) + 1;
    if (facNum > 8) {
      facNum = 8;
    }
    this.renderAxis(facNum);
  }

  renderAxis(facNum) {
    const node = this.axis;
    const axis = d3.axisBottom().ticks(facNum).scale(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    return (
      <g
        className="axis"
        ref={(c) => {
          this.axis = c;
        }}
        transform={this.props.translate}
      />
    );
  }
}
