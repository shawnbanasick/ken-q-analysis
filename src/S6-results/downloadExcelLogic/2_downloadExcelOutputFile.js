import * as XLSX from "xlsx";
// import { saveAs } from "filesaver.js-npm";
import currentDate1 from "../../Utils/currentDate1";
import currentTime1 from "../../Utils/currentTime1";
import S1DataSlice from "../../State/S1DataSlice";
import S6DataSlice from "../../State/S6DataSlice";

// const fs = require("fs");

const downloadExcelOutputFile = async (dataXlsx, sheetNamesXlsx, colSizes) => {
  const projectName = S1DataSlice.getState().projectName;
  let shouldIncludeTimestamp = S6DataSlice.getState().shouldIncludeTimestamp;

  const data = dataXlsx;
  const wsName = sheetNamesXlsx;
  const wscols = colSizes;

  function sheetFromArrayOfArrays(data) {
    const ws = {};
    const range = {
      s: {
        c: 10000000,
        r: 10000000,
      },
      e: {
        c: 0,
        r: 0,
      },
    };
    for (let R = 0; R !== data.length; ++R) {
      for (let C = 0; C !== data[R].length; ++C) {
        if (range.s.r > R) range.s.r = R;
        if (range.s.c > C) range.s.c = C;
        if (range.e.r < R) range.e.r = R;
        if (range.e.c < C) range.e.c = C;
        const cell = {
          v: data[R][C],
        };
        if (cell.v === null) continue;
        const cell_ref = XLSX.utils.encode_cell({
          c: C,
          r: R,
        });

        if (typeof cell.v === "number") cell.t = "n";
        else if (typeof cell.v === "boolean") cell.t = "b";
        else if (cell.v instanceof Date) {
          cell.t = "n";
          cell.z = XLSX.SSF._table[14];
          cell.v = XLSX.utils.datenum(cell.v);
        } else cell.t = "s";

        ws[cell_ref] = cell;
      }
    }
    if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);

    return ws;
  }

  function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
  }

  const wb = new Workbook();

  /* add worksheet to workbook */
  for (let i = 0; i < wsName.length; i += 1) {
    const ws = sheetFromArrayOfArrays(data[i]);
    ws["!cols"] = wscols[i];
    wb.SheetNames.push(wsName[i]);
    wb.Sheets[wsName[i]] = ws;
  }

  let wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "binary",
  });

  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i += 1) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  // to create option for no timestamp - useful for automated testing

  let nameFile;
  shouldIncludeTimestamp = true;
  if (shouldIncludeTimestamp === true) {
    nameFile = `KenQ_results_${projectName}_${timeStamp}.xlsx`;
  } else {
    nameFile = `KenQ_results_${projectName}.xlsx`;
  }

  let downloadBlob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  });

  // create alternative download link
  let downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(downloadBlob);
  downloadLink.download = nameFile;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export default downloadExcelOutputFile;
