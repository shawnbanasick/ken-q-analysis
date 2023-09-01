import React from "react";
import * as d3 from "d3";

export default class AxisBottom extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const tickSize = -(this.props.height - this.props.padding * 2);

    const node = this.axis;
    const axis = d3
      .axisBottom()
      .ticks(2)
      .tickSize(tickSize)
      .scale(this.props.scale);
    d3.select(node).call(axis).style("font-size", "15px");
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

/*

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function AxisBottom(props) {
  const axisRef = useRef(null);

  const renderAxis = (props) => {
    const tickSize = -(props.height - props.padding * 2);

    const axis = d3.axisBottom().ticks(2).tickSize(tickSize).scale(props.scale);

    d3.select(axisRef.current).call(axis).style("font-size", "15px");
  };

  useEffect(
    (props) => {
      renderAxis(props);
    },
    [props]
  );

  return <g className="axis" ref={axisRef} transform={props.translate} />;
}

export default AxisBottom;

*/
