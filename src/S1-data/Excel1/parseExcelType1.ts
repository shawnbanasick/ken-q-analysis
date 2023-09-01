import * as XLSX from "xlsx";
import { formatExcelType1ForDisplay } from "./formatExcelType1ForDisplay";
import S1DataSlice from "../../State/S1DataSlice";
import contains from "lodash/includes";

const parseExcelType1 = async (acceptedFiles: any) => {
  const filePromises = new Promise(function (resolve) {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      let tempVar, tempVar2, tempVar3, tempVar4;
      let tempArray = [];
      let newTypeWorksheetsCheck: string[] = [];
      let sortsArray: any[] = [];
      let statementsArray: any[] = [];
      let dataObject = {};
      let data, workbook: any, worksheet, sheet_name_list;
      let hasSortsWorksheet = false;
      let hasStatementsWorksheet = false;
      let filetype = "user-input"; // EXCEL TYPE 1

      reader.onload = async (e: any) => {
        try {
          data = e.target.result;
          workbook = XLSX.read(data, {
            type: "binary",
          });

          // iterate through every sheet and pull values
          sheet_name_list = workbook.SheetNames;

          // console.log("sheet_name_list: " + sheet_name_list);

          /* iterate through sheets */
          sheet_name_list.forEach(function (y: any) {
            let sheetname = y.toLowerCase();
            worksheet = workbook.Sheets[y];

            if (sheetname === "name" || sheetname === "names") {
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);
              tempVar3 = tempVar2.filter(Boolean);
              (dataObject as any).projectName = tempVar3[1];

              // console.log("name: " + tempVar3[1]);
            }

            if (sheetname === "pattern" || sheetname === "patterns") {
              newTypeWorksheetsCheck.push("pattern");
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });

              tempVar2 = tempVar.split(/\n/);
              // console.log("tempVar2: ", tempVar2);
              tempVar3 = tempVar2.filter(Boolean);
              (dataObject as any).multiplierArray = tempVar3[1];
            }

            if (sheetname === "minmax") {
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);
              tempVar3 = tempVar2.filter(Boolean);
              (dataObject as any).minMax = tempVar3[1];

              // console.log("minMax: " + tempVar3[1]);
            }

            if (sheetname === "version") {
              newTypeWorksheetsCheck.push("version");
              tempVar = XLSX.utils.sheet_to_csv(worksheet, {
                blankrows: false,
              });
              tempVar2 = tempVar.split(/\n/);
              tempVar3 = tempVar2.filter(Boolean);
              (dataObject as any).version = tempVar3[1];

              // console.log("version: " + tempVar3[1]);
            }

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

              // Read-in Sorts
              if (filetype === "user-input") {
                // todo - fix this - reading beyond what is necessary
                // file is split into lines above
                // artificial file size / q sort number limitation
                for (var i = 0; i < 200; i++) {
                  if (tempVar2[i] !== undefined) {
                    tempVar3 = tempVar2[i].split(",");
                    sortsArray.push(tempVar3);
                  }
                }
                (dataObject as any).sortsArray = sortsArray;
              } else if (filetype === "unforced") {
                tempVar3 = tempVar2.filter(Boolean);
                tempArray.push(tempVar3);
              }
            }

            // Read-in Statements
            if (sheetname === "statements" || sheetname === "statement") {
              hasStatementsWorksheet = true;
              tempArray = [];
              tempVar4 = XLSX.utils.sheet_to_json(worksheet);
              statementsArray.push(tempVar4);
              (dataObject as any).statementsArray = statementsArray;
            }
          }); // end iteration of for each worksheet tab

          if (hasSortsWorksheet === false) {
            S1DataSlice.setState({ showWarningBox: true });
            alert(
              `Can't find the 'sorts' worksheet! Check your Excel file, reload the webpage, and try again.`
            );
            throw new Error("Can't find the 'sorts' worksheet!");
          }
          if (hasStatementsWorksheet === false) {
            S1DataSlice.setState({ showWarningBox: true });
            alert(
              `Can't find the 'statements' worksheet! Check your Excel file, reload the webpage, and try again.`
            );
            throw new Error("Can't find the 'statements' worksheet!");
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

          const response = formatExcelType1ForDisplay(dataObject);

          resolve(response);
          // manage error messages
        } catch (error: any) {
          console.log(error.message);
          alert(error.message);
        }
      }; // end reader on load

      reader.onabort = () => {
        console.log("file reading was aborted");
        /* store.setState({
        excelErrorMessage1: "The file reader aborted the load process!",
        showExcelErrorModal: true
      }); */
      };
      reader.onerror = () => {
        console.log("The file reader encountered an error");
        /* store.setState({
        excelErrorMessage1: "The file reader encountered an error!",
        showExcelErrorModal: true
      }); */
      };

      reader.readAsBinaryString(file);
    });
  });

  const fileInfo = await filePromises;

  return fileInfo;
};

export default parseExcelType1;
