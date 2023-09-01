import pushProjectOverviewToOutputArray from "./2_pushProjectOverviewToOutputArray";

import S1DataSlice from "../../State/S1DataSlice";
import S5DataSlice from "../../State/S5DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

const pushProjectOverviewToOutputArrayDispatcher = () => {
  // State
  const qSortPattern3 = S1DataSlice.getState().qSortPattern;
  const autoFlagHistory = S5DataSlice.getState().autoFlagHistory;
  const version = S1DataSlice.getState().version;
  const projectName = S1DataSlice.getState().projectName;

  const totalStatements1 = S1DataSlice.getState().numStatements;
  const totalStatements = totalStatements1.toString();

  const totalSorts1 = S1DataSlice.getState().numQsorts;
  const totalSorts = totalSorts1.toString();

  const list = S1DataSlice.getState().projectHistoryArray;

  console.log("list", list);

  const distStateUpperValueText =
    S6DataSlice.getState().distStateUpperValueText;
  const distStateLowerValueText =
    S6DataSlice.getState().distStateLowerValueText;

  // no translation for "Project Overview" so that Excel Type 3 works when tab searching for parse data
  const sheetidTrans = "Project Overview";
  // get Translations
  const projectNameTrans = `${"Project Name"}:  `;
  const numStatementsTrans = `${"Total Number of Statements"}:  `;
  const qSortDesignTrans = `${"Q sort Design"}:  `;
  const totalNumSortsTrans = `${"Total Number of Q sorts"}:  `;
  const analsysProcessTrans = `${"Project Log"}:  `;
  const distThreshold1Trans = `${"Distinguishing statements threshold 1"}:  `;
  const distThreshold2Trans = `${"Distinguishing statements threshold 2"}:  `;
  const analysisCompleteTrans = `${"Analysis completed on"}:  `;
  const kadeVersionTrans = `${"KenQ Version Number"}:  `;

  const overViewTranslations = {
    sheetidTrans,
    projectNameTrans,
    numStatementsTrans,
    qSortDesignTrans,
    totalNumSortsTrans,
    analsysProcessTrans,
    distThreshold1Trans,
    distThreshold2Trans,
    analysisCompleteTrans,
    kadeVersionTrans,
  };

  const projectOverview = pushProjectOverviewToOutputArray(
    qSortPattern3,
    autoFlagHistory,
    version,
    projectName,
    totalStatements,
    totalSorts,
    list,
    distStateUpperValueText,
    distStateLowerValueText,
    overViewTranslations
  );
  return projectOverview;
};

export default pushProjectOverviewToOutputArrayDispatcher;
