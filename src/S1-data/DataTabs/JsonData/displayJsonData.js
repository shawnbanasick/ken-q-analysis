import store from "../../../store";
import shiftRawSortsPositive from "../../UploadFile/uploadLogic/shiftRawSortsPositive";
import checkUniqueParticipantName from "../../SortsList/checkUniqueParticipantName";
// refactor this
// all-app fix - re-calcuate posShiftSorts with user input if unforced sorts present
const displayJsonData = function(selection) {
    let id = selection.value;
    let JsonObj = store.getState("jsonObj");

    let temp1,
        sort0,
        sortArray,
        replaced,
        tempString1;
    let participantNames = [];
    let qSorts = [];
    let sortsDisplayText = [];
    let sortsAsNumbers = [];
    let minQsortValueArray;

    let keys = Object.keys(JsonObj);
    for (let i = 0, iLen = keys.length; i < iLen; i++) {
        if (id === "Id") {
            // create unique id from key
            temp1 = keys[i].slice(-10);
            participantNames.push(temp1);
        } else {
            // use the user-selected value as id
            temp1 = JsonObj[keys[i]][id];
            participantNames.push(temp1);
        }
        // get sort text from json and parse
        sort0 = JsonObj[keys[i]].sort;
        sortArray = "" + sort0.split("|");
        let replacedDisplay2 = sortArray.split("+").join("");
        let replacedQAV2 = sortArray.split("+").join(" ");
        let replacedDisplay3 = replacedDisplay2.split(",").join(",");
        let replacedQAV3 = replacedQAV2.split(",").join("");

        qSorts.push(replacedQAV3);
        replaced = replacedDisplay3.split(" 0").join("0");
        tempString1 = temp1 + "," + replaced;

        // convert strings to numbers
        //let tempArray3 = JSON.parse("[" + replaced + "]"); // throws error with non-numeric
        let array2 = replaced.split(",");
        let tempArray3 = [];
        for (let num of array2) {
            let value = parseInt(num, 10);
            if (isNaN(value)) {
                tempArray3.push(num);
            }
            tempArray3.push(value);
        }

        // hang on to one array before adding name to get min value
        minQsortValueArray = [...tempArray3];
        tempArray3.unshift(temp1);

        sortsAsNumbers.push(tempArray3);
        sortsDisplayText.push(tempString1);
    }

    let minValue = Math.min(...minQsortValueArray);
    let mainDataObject = [];
    for (let k = 0; k < sortsAsNumbers.length; k++) {
        let currentArray = sortsAsNumbers[k];
        let tempObj = {};
        let name = currentArray.shift();

        tempObj.name = name;
        tempObj.rawSort = [...currentArray];
        let posShiftSort = shiftRawSortsPositive([...currentArray], minValue);
        tempObj.posShiftSort = posShiftSort;
        tempObj.displaySort = sortsAsNumbers[k].toString();
        mainDataObject.push(tempObj);
    }
    //    return [sortsDisplayText, qSorts, keys, sort0, participantNames];

    let participantNames2 = checkUniqueParticipantName(participantNames);

    let projectName = store.getState("projectName");
    projectName = projectName.replace(/\./g, "");

    let qSortPattern = [...minQsortValueArray].sort(function(a, b) {
        return a - b;
    });

    store.setState({
        projectHistoryArray: [projectName + "data loaded from JSON file"],
        numQsorts: sortsAsNumbers.length,
        qSortPattern: qSortPattern,
        sortsDisplayText: sortsDisplayText,
        mainDataObject: mainDataObject,
        respondentNames: participantNames2,
        multiplierArray: ["not loaded"],
        showJsonFileLoadedMessage: false,
        dataOrigin: "json"
    });
};

export default displayJsonData;

/*
numQsorts
qSortPattern
mainDataObject
sortsDisplayText
repondentNames

check dropzoneCsvQsorts for code

*/
