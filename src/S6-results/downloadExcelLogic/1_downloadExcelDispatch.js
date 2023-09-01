import downloadExcelOutputFile from "./2_downloadExcelOutputFile";
import S6DataSlice from "../../State/S6DataSlice";

const downloadExcelDispatch = () => {
  // initialize output cascade

  const dataXlsx = S6DataSlice.getState().outputData;
  const colSizes = S6DataSlice.getState().colSizes;
  const sheetNamesXlsx = S6DataSlice.getState().sheetNamesXlsx;

  // needs dataXlsx, sheetNamesXlsx, colSizes from store
  downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
