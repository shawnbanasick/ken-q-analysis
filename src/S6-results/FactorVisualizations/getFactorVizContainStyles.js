const getFactorVizContainStyles = (props) => {
  // DYNAMIC height and width from prefs to set CONTAINER size
  // getState
  const positionData = props.positionData;
  const willAdjustCardWidth = props.factorVizOptions.willAdjustCardWidth;
  const willAdjustCardHeight = props.factorVizOptions.willAdjustCardHeight;
  const maxNumCards = Math.max(...positionData.instances);

  // set basic dimensions - HEIGHT
  let containerHeight;
  if (willAdjustCardHeight === true) {
    const newHeight = props.factorVizOptions.willAdjustCardHeightBy;
    containerHeight = 385 + newHeight * maxNumCards;
  } else {
    containerHeight = 145 * maxNumCards + 250;
  }

  // set basic dimensions - WIDTH
  let containerWidth;
  if (willAdjustCardWidth === true) {
    const newWidth = props.factorVizOptions.willAdjustCardWidthBy;
    containerWidth = 40 + newWidth * positionData.uniques.length;
  } else {
    containerWidth = 125 * positionData.uniques.length;
  }

  // make legend adjustment for container size?
  const shouldDisplayLegend = props.factorVizOptions.willIncludeLegend;
  if (shouldDisplayLegend === false) {
    containerHeight -= 250;
  }

  const container = {
    margin: "0 auto",
    textAlign: "center",
    width: containerWidth,
    height: containerHeight,
    marginBottom: 250,
  };

  // to change output section main content height / width
  // hidden to avoid react error - can't update while rendering, but not needed?
  // vizState.facVizContainerHeight = containerHeight;
  // vizState.facVizContainerWidth = containerWidth;

  return container;
};

export default getFactorVizContainStyles;
