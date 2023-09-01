import React from "react";
import LegendText from "./LegendText";
import SigSortsViz from "./SigSortsViz";
import RectangleText from "./RectangleText";
import BaseRectangles from "./BaseRectangles";
import LegendRectangle from "./LegendRectangle";
import FactorTitleText from "./FactorTitleText";
import HeaderRectangles from "./HeaderRectangles";
import HeaderColNumbers from "./HeaderColNumbers";
import DownloadFactorVizButtons from "./DownloadFactorVizButtons";
import getStyles from "./getFactorVizContainStyles";
// import vizState from "../../GlobalState/vizState";

const FactorViz = (props) => {
  const willIndicateDistinguishing =
    props.factorVizOptions.willIndicateDistinguishing;
  const showDistinguishingAs = props.factorVizOptions.showDistinguishingAs;

  let shouldDisplaySig = false;
  if (willIndicateDistinguishing && showDistinguishingAs === "symbol") {
    shouldDisplaySig = true;
  }

  let shouldDisplayLegend = props.factorVizOptions.willIncludeLegend;

  const margin = { top: 10, left: 50, bottom: 10, right: 10 };
  return (
    <div className="flex flex-col items-center" style={getStyles(props)}>
      <svg
        className="vizImage"
        id={`image${props.id}`}
        width={getStyles(props).width - margin.left - margin.right}
        height={getStyles(props).height - margin.top - margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          <FactorTitleText {...props} />
          <HeaderRectangles {...props} />
          <HeaderColNumbers {...props} />
          <BaseRectangles {...props} />
          <RectangleText {...props} />
          {shouldDisplaySig && <SigSortsViz {...props} />}
          {shouldDisplayLegend && <LegendRectangle {...props} />}
          {shouldDisplayLegend && <LegendText {...props} />}
        </g>
      </svg>
      <DownloadFactorVizButtons {...props} />
    </div>
  );
};

export default FactorViz;

/*
const VizContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
*/
