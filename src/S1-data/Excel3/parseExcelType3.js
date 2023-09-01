import * as XLSX from "xlsx";
import formatExcelType3ForDisplay from "./formatExcelType3ForDisplay";

const parseExcelType2 = async (acceptedFiles) => {
  const filePromises = new Promise(function (resolve) {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      // let tester, tester2, tester3, tester4;
      // let tempArray = [];
      let allWorksheets = [];
      let data, workbook, worksheet, sheet_name_list;
      let hasStatementsWorksheet = false;
      let hasAnalysisOverviewWorksheet = false;
      let hasSortsWorksheetFromKenQ = false;
      let response;

      reader.onload = function (e) {
        data = e.target.result;

        workbook = XLSX.read(data, {
          type: "binary",
        });

        // iterate through every sheet and pull values
        sheet_name_list = workbook.SheetNames;

        // error catch
        try {
          sheet_name_list.forEach(function (y) {
            let sheetname = y.toLowerCase();
            worksheet = workbook.Sheets[y];

            // find Project information
            if (sheetname === "Project Overview") {
              // turn off error report
              hasAnalysisOverviewWorksheet = true;

              let tester6 = XLSX.utils.sheet_to_csv(worksheet);
              let temp99 = tester6.split("\n");
              let temp99Array = [];
              for (let frag of temp99) {
                let tempArray2 = [];
                if (frag !== ",") {
                  tempArray2.push(frag);
                }
                temp99Array.push(tempArray2);
              }
              allWorksheets.push(temp99Array);

              // find q sorts
            } else if (sheetname === "q sorts" || y === "q-sorts") {
              // turn off error report
              hasSortsWorksheetFromKenQ = true;

              let tester = XLSX.utils.sheet_to_csv(worksheet);
              let tester2 = tester.split(/\n/);
              let tempArray3 = [];
              tester2.forEach(function (entry) {
                let tester3 = entry.split(",");
                tempArray3.push(tester3);
              });
              allWorksheets.push(tempArray3);

              // find Statements
            } else if (sheetname === "statements") {
              // turn off error report
              hasStatementsWorksheet = true;
              let tester4 = XLSX.utils.sheet_to_csv(worksheet);
              let statementString = tester4.split("\n");

              allWorksheets.push(statementString);
            }
          }); // end iteration of for each

          if (
            hasSortsWorksheetFromKenQ === false ||
            hasStatementsWorksheet === false ||
            hasAnalysisOverviewWorksheet === false
          ) {
            console.log("error throw attempted");
            throw new Error("Excel input error");
          }
        } catch (error) {
          // set error message
          if (hasSortsWorksheetFromKenQ === false) {
            console.log("missing sorts worksheet");
          }
          if (hasStatementsWorksheet === false) {
            console.log(JSON.stringify("missing statements worksheet"));
          }
          if (hasAnalysisOverviewWorksheet === false) {
            console.log(JSON.stringify("missing overview worksheet"));
          }
        } // end error catching

        if (
          hasSortsWorksheetFromKenQ === true &&
          hasStatementsWorksheet === true &&
          hasAnalysisOverviewWorksheet === true
        ) {
          response = formatExcelType3ForDisplay(allWorksheets);
          // store.setState({ dataOrigin: "excel" });
          resolve(response);
        }
      };
      reader.onabort = () => {
        console.log("file reading was aborted");
      };
      reader.onerror = () => {
        console.log("The file reader encountered an error");
      };
      reader.readAsBinaryString(file);
    });
  });

  const fileInfo = await filePromises;
  return fileInfo;
};

export default parseExcelType2;

/*





const filePickedKenq = function (e) {
    let language = QAV.getState("language");
    let localText1 = resources[language].translation["Project Overview"];
    let localText2 = resources[language].translation.Statements;
    let errorPanel = $("#genericErrorModal .errorPanel");

    let files = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result;

        let workbook = XLSX.read(data, {
            type: 'binary'
        });

        // iterate through every sheet and pull values
        let hasSortsWorksheet = false;
        let hasStatementsWorksheet = false;
        let hasSortsWorksheetFromKenQ = false;
        let allWorksheets = [];
        let sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) { // iterate through sheets 

            let worksheet = workbook.Sheets[y];

            let tempArray;

            if (y === localText1) {
                tempArray = [];
                let tester6 = XLSX.utils.sheet_to_json(worksheet);
                tempArray.push(tester6);

            } else if (y === "Q-sorts") {
                hasSortsWorksheetFromKenQ = true;
                let tester = XLSX.utils.sheet_to_csv(worksheet);
                let tester2 = tester.split(/\n/);
                tempArray = [];
                tester2.forEach(function (entry) {
                    let tester3 = entry.split(',');
                    tempArray.push(tester3);
                });
            } else if (y === localText2) {
                hasStatementsWorksheet = true;
                tempArray = [];
                let tester4 = XLSX.utils.sheet_to_json(worksheet);
                tempArray.push(tester4);
            }
            allWorksheets.push(tempArray);
        }); // end iteration for each


        if (hasSortsWorksheetFromKenQ === false) {
            errorPanel.empty();
            errorPanel.append("<p>Can't find Q sorts. Please check your file's formatting and try again.</p><br>");
            VIEW.showGenericErrorModal();
        }
        if (hasStatementsWorksheet === false) {
            errorPanel.empty();
            errorPanel.append("<p>Can't find sort statements. Please check your file's formatting and try again.</p><br>");
            VIEW.showGenericErrorModal();
        }
        formatKenqUploadForDisplay(allWorksheets);
    };
    reader.readAsBinaryString(files);
};
export default filePickedKenq;
  */
