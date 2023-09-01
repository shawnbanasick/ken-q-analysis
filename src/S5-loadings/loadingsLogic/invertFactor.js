import S1DataSlice from "../../State/S1DataSlice";
import S3DataSlice from "../../State/S3DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const invertFactor = () => {
  const factorToInvert = S5DataSlice.getState().factorToInvert;
  const currentLoadingsTable = S5DataSlice.getState().currentLoadingsTable;
  const projectHistoryArray = S1DataSlice.getState().projectHistoryArray;
  const currentLoadings = S3DataSlice.getState().factorMatrix;

  // only if a factor is selected
  if (factorToInvert !== undefined) {
    // flip the sign for the current table (includes user checked checkboxes)
    const factorToInvertText = `factor${factorToInvert}`;

    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      currentLoadingsTable[i][factorToInvertText] =
        -currentLoadingsTable[i][factorToInvertText];
    }

    // pull project history and number facs from state

    // get data

    /*
    // getState - archive current data for undo function in loadings table
    let archiveCounter = S4DataSlice.getState().archiveCounter;
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    rotationState.archiveCounter = archiveCounter;
    // send archive to local storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify([...currentLoadings]));
    */

    // isolate the factor to invert
    const invertArray = currentLoadings[factorToInvert - 1];

    // do factor inversion
    for (let i = 0; i < invertArray.length; i += 1) {
      invertArray[i] = -invertArray[i];
    }

    // update project history
    const projectHistoryArrayText = `Factor ${factorToInvert} was inverted`;

    /*
    const logMessageObj = {
      logMessage: projectHistoryArrayText,
      logType: "invertFactor",
    };
    */

    projectHistoryArray.push(projectHistoryArrayText);

    // update project log state
    S1DataSlice.setState({
      projectHistoryArray: projectHistoryArray,
    });

    S3DataSlice.setState({
      factorMatrix: currentLoadings,
    });

    S5DataSlice.setState({
      sendDataToOutputButtonColor: "bg-orange-300",
      gridRowDataLoadingsTable: currentLoadingsTable,
      // factorToInvert: undefined,
    });

    // hide section 6
    S6DataSlice.setState({
      showOutputFactorSelection: false,
      userSelectedFactors: [],
      shouldDisplayFactorVizOptions: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false,
    });
  }
  return factorToInvert;
};

export default invertFactor;
