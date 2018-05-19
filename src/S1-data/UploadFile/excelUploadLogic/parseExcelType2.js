import * as XLSX from "xlsx";
import store from "../../../store";
import formatExcelType2ForDisplay from "./formatExcelType2ForDisplay";

function parseExcelType2(acceptedFiles) {
  acceptedFiles.forEach(file => {
    const reader = new FileReader();
    var tester, tester2, tester3, tester4;
    var tempArray = [];
    // var allWorksheets = [];
    let dataObject = {};
    var data, workbook, worksheet, sheet_name_list;
    var hasSortsWorksheet = false;
    var hasStatementsWorksheet = false;
    var filetype = "unforced"; // EXCEL TYPE 2

    reader.onload = function(e) {
      try {
        data = e.target.result;

        workbook = XLSX.read(data, {
          type: "binary"
        });

        // iterate through every sheet and pull values
        sheet_name_list = workbook.SheetNames;

        sheet_name_list.forEach(function(y) {
          let sheetname = y.toLowerCase();
          /* iterate through sheets */
          worksheet = workbook.Sheets[y];
          if (
            sheetname === "sorts" ||
            sheetname === "qsorts" ||
            sheetname === "q-sorts"
          ) {
            hasSortsWorksheet = true;
            tester = XLSX.utils.sheet_to_csv(worksheet);
            tester2 = tester.split(/\n/);

            if (filetype === "user-input") {
              for (var i = 1; i < 200; i++) {
                tester3 = tester2[i].split(",");
                tempArray.push(tester3);
              }
            } else if (filetype === "unforced") {
              tester3 = tester2.filter(Boolean);
              // tempArray.push(tester3);
              dataObject.sortsArray = tester3;
            }
          } else if (sheetname === "statements" || sheetname === "statement") {
            hasStatementsWorksheet = true;
            // tempArray = [];
            tester4 = XLSX.utils.sheet_to_json(worksheet);
            // tempArray.push(tester4);
          }

          dataObject.statementsArray = tester4;
        }); // end iteration of for each

        if (hasSortsWorksheet === false) {
          throw new Error("Can't find the 'sorts' worksheet tab!");
        }
        if (hasStatementsWorksheet === false) {
          throw new Error("Can't find the 'statements' worksheet tab!");
        }

        formatExcelType2ForDisplay(dataObject);
        store.setState({ dataOrigin: "excel" });
      } catch (error) {
        // set error message
        store.setState({
          excelErrorMessage1: error.message,
          showExcelErrorModal: true
        });
      }
    };
    reader.onabort = () => {
      console.log("file reading was aborted");
      store.setState({
        excelErrorMessage1: "The file reader aborted the load process!",
        showExcelErrorModal: true
      });
    };
    reader.onerror = () => {
      console.log("The file reader encountered an error");
      store.setState({
        excelErrorMessage1: "The file reader encountered an error!",
        showExcelErrorModal: true
      });
    };

    reader.readAsBinaryString(file);
  });
}

export default parseExcelType2;
