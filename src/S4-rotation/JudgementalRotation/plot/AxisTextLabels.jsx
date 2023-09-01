import React, { Component } from "react";
import S4DataSlice from "../../../State/S4DataSlice";
import cloneDeep from "lodash/cloneDeep";

const styles = {
  yAxis: {
    position: "absolute",
    color: "red",
    backgroundColor: "red",
  },
  xAxis: {
    position: "absolute",
    color: "black",
  },
};

class AxisTextLables extends Component {
  render() {
    const size = this.props.width - this.props.padding;
    // getState
    const abFactors = cloneDeep(S4DataSlice.getState().abFactors);
    const factorA = `Factor ${abFactors[0]}`;
    const factorB = `Factor ${abFactors[1]}`;
    return (
      <g>
        <text
          x={-(this.props.height - this.props.padding) / 2 - 45}
          y={this.props.padding - 18}
          transform={"rotate(-90)"}
        >
          {factorA}
        </text>
        <text x={size / 2 - 10} y={size + 45} style={styles.xAxis}>
          {factorB}
        </text>
      </g>
    );
  }
}

export default AxisTextLables;
