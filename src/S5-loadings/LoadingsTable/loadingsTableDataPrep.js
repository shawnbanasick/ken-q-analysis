import store from "../../store";
import evenRound from "../../Utils/evenRound";
import CheckboxRenderer from "./CheckboxRenderer";
import factorGroupComparator from "./factorGroupComparator";
import sortByFactorGroup from "../loadingsLogic/sortByFactorGroup";

// todo - re-organize factor groupings and sorts to optimize number of required loops
const loadingsTableDataPrep = numFactors => {
  // factorMatrix should be factors as rows - in Lipset => 9 cols, 7 -8 rows
  let factorMatrix1 = store.getState("factorMatrix");

  let respondentNames = store.getState("respondentNames");

  // get matrix autoflag booleans
  let fSigCriterionResults = store.getState("fSigCriterionResults");

  // calculate the factor groupings so they can be assigned in col defs
  let highlighting = store.getState("highlighting");
  let factorGroupings = sortByFactorGroup([...factorMatrix1], highlighting);
  let showAutoFlags = store.getState("showAutoFlags");

  // set up Table Headers
  let tempRotFacStateArray = [];
  let gridColDefsLoadingsTable = [
    {
      headerName: "Num",
      field: "resNum",
      pinned: true,
      editable: false,
      width: 40,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: "Participant",
      field: "respondent",
      width: 150,
      pinned: true,
      editable: false,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: "FG",
      field: "factorGroup",
      pinned: true,
      width: 60,
      editable: false,
      comparator: factorGroupComparator,
      cellStyle: {
        textAlign: "center"
      }
    },

    {
      headerName: "highlighting",
      field: "highlighting",
      pinned: false,
      editable: false,
      cellStyle: {
        textAlign: "center"
      },
      hide: true
    },
    {
      headerName: "defaultSort",
      field: "defaultSort",
      pinned: false,
      editable: false,
      cellStyle: {
        textAlign: "center"
      },
      hide: true
    }
  ];

  for (let i = 0; i < numFactors; i++) {
    let facNumber = i + 1;
    gridColDefsLoadingsTable.push(
      {
        headerName: "Factor " + facNumber,
        field: "factor" + facNumber,
        pinned: false,
        width: 70,
        editable: false,
        sortable: true,
        cellStyle: {
          textAlign: "right"
        }
      },
      {
        headerName: "F" + facNumber,
        field: "check" + facNumber,
        pinned: false,
        editable: true,
        width: 40,
        cellRendererFramework: CheckboxRenderer,
        cellStyle: {
          textAlign: "left"
        }
      }
    ); // end push
  } // end loop

  // set up row data
  let gridRowDataLoadingsTable = [];
  //for (let j = 0; j < factorMatrix1[0].length; j++) {
  for (let j = 0; j < respondentNames.length; j++) {
    let responNum = j + 1;
    let tempArray = {};
    let tempArray2 = [];
    tempArray.resNum = responNum;
    tempArray.respondent = respondentNames[j];
    tempArray.factorGroup = factorGroupings[j][1];
    tempArray.highlightingClass = factorGroupings[j][3];
    tempArray.defaultSort = factorGroupings[j][2];

    for (let k = 0; k < factorMatrix1.length; k++) {
      let facNum = k + 1;
      //tempArray["factor" + facNum] = evenRound(factorMatrix1[k][j], 4);
      let tempVal = evenRound(factorMatrix1[k][j], 4);
      tempArray["factor" + facNum] = tempVal;
      // to set up tempRotStateArray
      tempArray2.push(tempVal);
      if (showAutoFlags) {
        tempArray["check" + facNum] = fSigCriterionResults[j][k];
      } else {
        tempArray["check" + facNum] = false;
      }
    }
    tempRotFacStateArray.push(tempArray2);
    gridRowDataLoadingsTable.push(tempArray);
  }

  // to default order chart by highest factor loading
  gridRowDataLoadingsTable.sort(function(a, b) {
    return a.defaultSort - b.defaultSort;
  });

  store.setState({
    showAutoFlags: false,
    gridColDefsLoadingsTable: gridColDefsLoadingsTable,
    gridRowDataLoadingsTable: gridRowDataLoadingsTable,
    // tempRotFacStateArray: tempRotFacStateArray,
    isLoadingFactorsKept: false,
    isLoadingAutoflag: false,
    isLoadingNoHighlighting: false,
    isLoadingColorsHighlighting: false,
    isLoadingGrayHighlighting: false
  });
};

export default loadingsTableDataPrep;
