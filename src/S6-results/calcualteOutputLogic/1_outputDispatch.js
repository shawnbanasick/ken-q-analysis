import pushProjectOverviewToOutputArrayDispatcher from "./2_pushProjectOverviewToOutputArrayDispatcher";
import pushStatementsToOutputArrayDispatcher from "./pushStatementsToOutputArrayDispatcher";
import pushSortsToOutputArray from "./2_pushSortsToOutputArray";
import pushCorrelationsToOutputArray from "./2_pushCorrelationsToOutputArray";
import pushUnrotatedFactorsTableToOutputArray from "./2_pushUnrotatedFactorsTableToOutputArray";
import pushCumComMaxtrixToOutputArray from "./2_pushCumComMatrixToOutputArray";
import pushRotatedFactorsArrayToOutput from "./2_pushRotatedFactorsArrayToOutput";
import pushFreeDistributionDataToOutput from "./2_pushFreeDistributionDataToOutput";
import pushFactorsToOutput from "./2_pushFactorsToOutput";
import pushFactorScoreComparisonRanksTableToOutput from "./2_pushFactorScoreComparisonRanksTableToOutput";
import pushFactorScoreCorrelationsToOutput from "./2_pushFactorScoreCorrelationsToOutput";
import insertFactorsIntoOutput from "./2_insertFactorsIntoOutput";
import pushFactorPowerSetDiffsToOutput from "./2_pushFactorPowerSetDiffsToOutput";
import pushConsensusStatementsToOutput from "./2_pushConsensusStatementsToOutput";
import pushFactorCharacteristicsToOutput from "./2_pushFactorCharacteristicsToOutput";
import pushStandardErrorsDifferencesToOutput from "./2_pushStandardErrorsDifferencesToOutput";
import pushDistinguishingStatementsToOutput from "./2_pushDistinguishingStatementsToOutput";
import pushCribSheetsToOutput from "./2_pushCribSheetsToOutput";
import pushLoadingsTableToOutput from "./2_pushLoadingsTableToOutput";
import S6DataSlice from "../../State/S6DataSlice";

const outputDispatch = () => {
  const userSelectedFactors = S6DataSlice.getState().userSelectedFactors;
  // begin output cascade

  const step1 = pushProjectOverviewToOutputArrayDispatcher();
  // returns [outputData, sheetNamesXlsx, colSizes]

  // expects outputData, sheetNamesXlsx, colSizes
  const step2 = pushStatementsToOutputArrayDispatcher(...step1);
  //    pushSortsToOutputArray(outputData, sheetNamesXlsx, colSizes);

  const step3 = pushSortsToOutputArray(...step2);

  // pushCorrelationArray(outputData, sheetNamesXlsx, colSizes);
  const step4 = pushCorrelationsToOutputArray(...step3);

  // pushUnrotatedFactorsTableToOutputArray(outputData, sheetNamesXlsx, colSizes);
  const step5 = pushUnrotatedFactorsTableToOutputArray(...step4);

  // pushCumulativeCommunalitiesMaxtrixToOutputArray(outputData, sheetNamesXlsx, colSizes);
  const step6 = pushCumComMaxtrixToOutputArray(...step5);

  // pushRotatedFactorsArrayToOutputArray(outputData, sheetNamesXlsx, colSizes);
  const step7 = pushRotatedFactorsArrayToOutput(...step6);

  // push loadings table data to output
  const step7b = pushLoadingsTableToOutput(...step7);

  // pushFreeDistributionDataToOutputArray(outputData, sheetNamesXlsx, colSizes);
  const step8 = pushFreeDistributionDataToOutput(...step7b);

  // pushFactorsToOutputArray(outputData, sheetNamesXlsx, colSizes);
  const step9 = pushFactorsToOutput(...step8);

  // halt processing if factors without flag are selected
  if (step9 === "haltOutputProcessing") {
    console.log(
      "dispatch - processing stopped due to factors without flag selected"
    );
    return "error";
  }

  // pushFactorScoreComparisonRanksTableToOutputArray(outputData, sheetNamesXlsx, colSizes);
  const step10 = pushFactorScoreComparisonRanksTableToOutput(...step9);

  // pushFactorScoreCorrelationsToOutputArray(outputData, sheetNamesXlsx, colSizes);
  const step11 = pushFactorScoreCorrelationsToOutput(...step10);

  // insertFactorsIntoOutputArray(analysisOutput, outputData, sheetNamesXlsx, colSizes);
  const step12 = insertFactorsIntoOutput(...step11);

  if (userSelectedFactors.length > 1) {
    // pushFactorPowerSetDiffsToOutputArray(analysisOutput, outputData, sheetNamesXlsx, colSizes);
    const step13 = pushFactorPowerSetDiffsToOutput(...step12);

    // pushConsensusStatementsToOutput(analysisOutput, outputData, sheetNamesXlsx, colSizes);
    const step14 = pushConsensusStatementsToOutput(...step13);

    // pushFactorCharacteristicsToOutput(analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
    const step15 = pushFactorCharacteristicsToOutput(...step14);

    // pushStandardErrorsDifferencesToOutput(stndErrorArray, analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
    const step16 = pushStandardErrorsDifferencesToOutput(...step15);

    // pushDistinguishingStatementsToOutput(sigSortsArray, analysisOutput, stndErrorDiffDataArray, stndErrorDiffDataDistingArray, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
    const step17 = pushDistinguishingStatementsToOutput(...step16);

    // pushCribSheetsToOutput(outputData, sheetNamesXlsx, colSizes);

    const step18 = pushCribSheetsToOutput(...step17);

    S6DataSlice.setState({
      outputData: step18[0],
      sheetNamesXlsx: step18[1],
      colSizes: step18[2],
      showFactorCorrelationsTable: true,
      showFactorCharacteristicsTable: true,
      showStandardErrorsDifferences: true,
    });
    console.log("dispatch - normal output cascade 1-18 complete");
  } else {
    S6DataSlice.setState({
      outputData: step12[1],
      sheetNamesXlsx: step12[2],
      colSizes: step12[3],
    });
    console.log("no user selected factors");
  }
};

export default outputDispatch;
