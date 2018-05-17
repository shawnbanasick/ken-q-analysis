import store from "./../../store";
// import { checkIfOnline } from "./checkIfOnline";
import { calculateCorrelations } from "./createCorrelations";
import workerCorr from "../../wrkrs/workerCorr";

export function mainCorrCalcs(respondentNames, rawSortsArray) {
    // // todo - add check for unique names
    // let mainDataObject = store.getState("mainDataObject");
    // let respondentNames = store.getState("respondentNames");

    // // pull rawSorts from STATE mainDataObject
    // let rawSortsArray = [];
    // mainDataObject.forEach(function(element) {
    //   rawSortsArray.push(element.rawSort);
    // }, this);

    // todo - reset web workers
    // let isOnline = checkIfOnline();
    let isOnline = false;

    if (window.Worker && isOnline) {
        console.log("worker called");

        workerCorr();

        // $("#correlationSpinnerText").css('visibility', 'visible');
        // $("#correlationSpinnerDiv").addClass('calcSpinner');
        //var myWorker = new Worker('../../wrkrs/workerCorr.js');
        //var workerMessageArray = rawSortsArray;

        // originalSortSize2,
        // sortsFromExistingData,
        // namesFromExistingData

        //console.log('worker prep: ' + JSON.stringify(workerMessageArray));

        // myWorker.postMessage(workerMessageArray);
        // myWorker.onmessage = function(e) {
        // console.log('worker results: ' + JSON.stringify(e.data));

        // QAV.setState('sortsAsNumbers', e.data[0]);
        // QAV.setState('positiveShiftedRawSorts', e.data[1]);
        // QAV.setState('correlationTableArrayFormatted', e.data[2]);
        // QAV.setState('respondentNames', e.data[3]);
        // QAV.setState('originalCorrelationValues', e.data[4]);

        // remove spinner and message

        // draw the display table
        // createDisplayTableJQUERY(e.data[2], 'correlationTable');

    // t1 = performance.now();
    // }
    } else {
        if (respondentNames.length > 0) {
            // $("#correlationsSpinner").append('<p id="spinnerText">&nbsp&nbsp Calculating, <i>please wait</i>&nbsp&nbsp</p>').fadeIn(300);

            // do the calcuations
            calculateCorrelations(rawSortsArray, respondentNames);

            // $("#correlationsSpinner").children("p").remove();

        // draw the display table
        // createDisplayTableJQUERY(createCorrelationTable, 'correlationTable');
        }
    }
    store.setState({
        showCorrelationMatrix: true,
        activeStartAnalysisButton: true,
        isLoadingBeginAnalysis: false
    });
}
