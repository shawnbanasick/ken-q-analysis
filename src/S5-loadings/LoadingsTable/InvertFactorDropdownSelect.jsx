import React from "react";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";

const saveDropdownValueToState = (event) => {
  let data = event.target.value;
  S5DataSlice.setState({ factorToInvert: data });
};

const InvertFactorDropdownSelect = () => {
  let optionsBaseArray = [1, 2, 3, 4, 5, 6, 7, 8];

  optionsBaseArray.length = +S4DataSlice.getState().numFactorsKeptForRot;

  // dynamically create options list
  let optionElArray = [];
  for (let i = 0; i < optionsBaseArray.length; i++) {
    let optionEl = (
      <option key={`${optionsBaseArray[i]}`}>{optionsBaseArray[i]}</option>
    );
    optionElArray.push(optionEl);
  }

  optionElArray.unshift(
    <option key={0} className="text-right" value="default">
      ?
    </option>
  );

  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl mb-4">Select the Factor to Invert</span>
      <select
        className="select select-bordered rounded-md w-[73px] font-bold"
        placeholder={"?"}
        onChange={saveDropdownValueToState}
      >
        {optionElArray.map((item) => item)}
      </select>
    </div>
  );
};
export default InvertFactorDropdownSelect;
