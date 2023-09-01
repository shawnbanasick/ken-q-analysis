import React from "react";
import S1DataSlice from "../../State/S1DataSlice";

const ForcedInput = () => {
  const { showForcedInput, setQSortPattern } = S1DataSlice();

  const handleChange = (e: any) => {
    let array = e.target.value;
    let qSortPatternArray2 = array.split(",");
    let qSortPatternArray = [];
    for (let num of qSortPatternArray2) {
      let value = parseInt(num, 10);
      if (!isNaN(value)) {
        qSortPatternArray.push(value);
      }
    }
    qSortPatternArray.sort(function (a, b) {
      return a - b;
    });
    setQSortPattern([...qSortPatternArray]);
  };

  if (showForcedInput) {
    return (
      <div className="text-left ml-4 mt-5 w-11/12">
        <label className="label">
          <span className="block">Input Q Sort Pattern:</span>
        </label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          className="input input-bordered rounded-md w-full p-2"
          placeholder="type sort values separated by commas"
        />
      </div>
    );
  } else {
    return <div style={{ height: 38 }} />;
  }
};

export default ForcedInput;
