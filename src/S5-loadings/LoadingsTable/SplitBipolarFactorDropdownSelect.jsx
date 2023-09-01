import React from "react";
import S4DataSlice from "../../State/S4DataSlice";
import S5DataSlice from "../../State/S5DataSlice";

const InvertFactorDropdownSelect = () => {
  const { setFactorToSplit } = S5DataSlice();
  const { numFactorsKeptForRot } = S4DataSlice();

  // save to global state
  const saveDropdownValueToState = (event) => {
    setFactorToSplit(event.target.value);
  };

  let array = [1, 2, 3, 4, 5, 6, 7, 8];
  // shorten options list if using centroid
  array.length = +numFactorsKeptForRot;

  const optionItems = array.map((number) => (
    <option className="bg-red-200" key={number.toString()} value={number}>
      {number}
    </option>
  ));

  optionItems.unshift(
    <option key={0} className="text-right" value="default">
      ?
    </option>
  );

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-3xl mb-4">Select the Factor to Split</span>
      <select
        className="select select-bordered indent-2 rounded-md w-[73px] font-bold"
        onChange={saveDropdownValueToState}
      >
        {optionItems}
      </select>
    </div>
  );
};

export default InvertFactorDropdownSelect;
