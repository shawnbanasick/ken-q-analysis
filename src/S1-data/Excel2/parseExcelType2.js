import S1DataSlice from "../../State/S1DataSlice";
import * as XLSX from "xlsx";
import formatExcelType2ForDisplay from "./formatExcelType2ForDisplay";
import contains from "lodash/includes";

const parseExcelType2 = async (acceptedFiles) => {
  const filePromises = new Promise(function (resolve) {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      let tempVar, tempVar2, tempVar3, tempVar4;

      let tempArray = [];
      let newTypeWorksheetsCheck = [];
      let dataObject = {};
      let statementsArray = [];
      let data, workbook, worksheet, sheet_name_list;
      let hasSortsWorksheet = false;
      let hasStatementsWorksheet = false;
      let filetype = "unforced"; // EXCEL TYPE 2

      reader.onload = function (e) {
        try {
          data = e.target.result;
          workbook = XLSX.read(data, {
            type: "binary",
          });

          // iterate through every sheet and pull values
          sheet_name_list = workbook.SheetNames;

          sheet_name_list.forEach(function (y) {
            let sheetname = y.toLowerCase();
            /* iterate through sheets */
            worksheet = workbook.Sheets[y];

            if (sheetname === "version") {
              newTypeWorksheetsCheck.push("version");
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);
              tempVar3 = tempVar2.filter(Boolean);
              dataObject.version = tempVar3[1];
            }

            if (sheetname === "name" || sheetname === "names") {
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);
              tempVar3 = tempVar2.filter(Boolean);
              dataObject.projectName = tempVar3[1];
            }

            if (sheetname === "pattern" || sheetname === "patterns") {
              newTypeWorksheetsCheck.push("pattern");
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);
              tempVar3 = tempVar2.filter(Boolean);
              dataObject.multiplierArray = tempVar3[1];
              if (tempVar2[1] === undefined) {
                S1DataSlice.setState({ showWarningBox: true });
                alert(
                  "Can't find the Q sort pattern! Check your Excel file, reload the webpage, and try again."
                );
                throw new Error("Can't find the Q sort pattern!");
              }
            }

            if (sheetname === "minmax") {
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);
              tempVar3 = tempVar2.filter(Boolean);
              dataObject.minMax = tempVar3[1];
            }

            // Read-in the "sorts" worksheet
            if (
              sheetname === "sorts" ||
              sheetname === "qsorts" ||
              sheetname === "q-sorts"
            ) {
              hasSortsWorksheet = true;
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);

              if (filetype === "user-input") {
                for (let i = 1; i < 200; i++) {
                  tempVar3 = tempVar2[i].split(",");
                  tempArray.push(tempVar3);
                }
              } else if (filetype === "unforced") {
                tempVar3 = tempVar2.filter(Boolean);
                dataObject.sortsArray = tempVar3;
              }
            }

            // Read-in the "statements" worksheet
            if (sheetname === "statements" || sheetname === "statement") {
              hasStatementsWorksheet = true;
              tempArray = [];
              tempVar4 = XLSX.utils.sheet_to_json(worksheet, {
                blankrows: false,
              });
              statementsArray.push(tempVar4);
              dataObject.statementsArray = statementsArray;
            }
          }); // END ITERATING THROUGH SHEETS

          // ERROR CHECKING
          if (hasSortsWorksheet === false) {
            S1DataSlice.setState({ showWarningBox: true });
            alert(
              "Can't find the 'sorts' worksheet tab! Check your Excel file, reload the webpage, and try again."
            );
            throw new Error("Can't find the 'sorts' worksheet tab!");
          }
          if (hasStatementsWorksheet === false) {
            S1DataSlice.setState({ showWarningBox: true });
            alert(
              "Can't find the 'statements' worksheet tab! Check your Excel file, reload the webpage, and try again."
            );
            throw new Error("Can't find the 'statements' worksheet tab!");
          }

          if (
            contains(newTypeWorksheetsCheck, "pattern") ||
            contains(newTypeWorksheetsCheck, "patterns")
          ) {
            if (contains(newTypeWorksheetsCheck, "version") === false) {
              S1DataSlice.setState({ showWarningBox: true });
              alert(
                "Can't find the 'version' worksheet tab! Check your Excel file, reload the webpage, and try again."
              );
              throw new Error("Can't find the 'version' worksheet tab!");
            }
          }

          const response = formatExcelType2ForDisplay(dataObject);

          resolve(response);
        } catch (error) {
          console.log(error.message);
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
