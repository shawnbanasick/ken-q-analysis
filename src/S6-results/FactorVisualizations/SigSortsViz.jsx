import React from "react";

const widthValue = (props) => {
  const shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
  if (shouldAdjustWidth === true) {
    const newCardWidth = props.factorVizOptions.willAdjustCardWidthBy;
    return newCardWidth;
  }
  return 110;
};

const headerHeight = () => 26;

const heightValue = (props) => {
  const shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
  if (shouldAdjustHeight === true) {
    let cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
    if (cardHeight < 60) {
      cardHeight = 60;
    }
    return cardHeight;
  }
  return 110;
};

const styles = {
  fontSize: 12,
  stroke: "none",
  zindex: 9999,
  fill: "black",
};

const renderSigSortsIndicators = (props) => {
  const shouldUseUnicode = true; // props.factorVizOptions.shouldUseUnicode;
  const willDisplayDistingCompareSymbols =
    props.factorVizOptions.willDisplayDistingCompareSymbols;
  const willAdjustIndicatorSizeBy =
    props.factorVizOptions.willAdjustDistIndicatorSizeBy;

  const width = widthValue(props);
  const height = heightValue(props);
  const headerHeight1 = headerHeight();
  return (coords, index) => {
    let text;
    let arrow;
    let symbol;

    if (shouldUseUnicode) {
      if (willDisplayDistingCompareSymbols) {
        symbol = props.data[index].sigVisualizationUni;
        arrow = props.data[index].directionSymbolUni;
        text = symbol + arrow;
      } else {
        text = props.data[index].sigVisualizationUni;
      }
    } else if (willDisplayDistingCompareSymbols) {
      symbol = props.data[index].sigVisualization;
      arrow = props.data[index].directionSymbol;
      text = symbol + arrow;
    } else {
      text = props.data[index].sigVisualization;
    }

    // adjust distinguishing symbols here
    // todo - set user selected custom value for dy for symbols
    const sigSymbolProps = {
      x: props.positionData.xPosLoop[index] * width + 10,
      y:
        props.positionData.yPosLoop[index] * height +
        headerHeight1 +
        42 +
        1.7 * willAdjustIndicatorSizeBy,
      key: props.positionData.numRectsArray[index],
      text,
      textAnchor: "left",
      fontSize: willAdjustIndicatorSizeBy,
    };
    return (
      <text {...styles} {...sigSymbolProps}>
        {sigSymbolProps.text}
      </text>
    );
  };
};

const Indicators = (props) => (
  <g>{props.data.map(renderSigSortsIndicators(props))}</g>
);

export default Indicators;
