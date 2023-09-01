import S6DataSlice from "../../State/S6DataSlice";

const pushFreeDistributionDataToOutput = function (
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  sheetNamesXlsx.push("Free Dist");

  const columns = [
    {
      wch: 10,
    },
    {
      wch: 20,
    },
    {
      wch: 10,
    },
    {
      wch: 10,
    },
  ];
  colSizes.push(columns);

  const freeDistributionArray = S6DataSlice.getState().freeDistributionArray;

  freeDistributionArray.unshift(
    ["free", ""],
    ["", ""],
    ["Free Distribution Data Results"],
    ["", ""]
  );

  outputData.push(freeDistributionArray);

  console.log("dispatch - 8 - pushFreeDistributionData complete");
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushFreeDistributionDataToOutput;
