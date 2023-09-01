import S1DataSlice from "../../State/S1DataSlice";

const cleanMultiplierArray = (multiplierArray: any) => {
  let multiplierArray2 = multiplierArray.split(",").filter((item: any) => item);
  let newMultiplierArray = multiplierArray2.map((item: any) => {
    return parseInt(item, 10);
  });
  //console.log(newMultiplierArray);
  //console.log(newMultiplierArray.length);

  if (newMultiplierArray.length !== 20) {
    S1DataSlice.setState({ showWarningBox: true });
    alert(
      `There are missing values in the Q sort pattern Check your Excel file, reload the webpage, and try again.`
    );
    throw new Error("Multiplier Array must contain 20 values");
  }

  return newMultiplierArray;
};

export default cleanMultiplierArray;
