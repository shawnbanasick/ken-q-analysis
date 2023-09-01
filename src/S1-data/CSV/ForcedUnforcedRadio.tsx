import React from "react";
import S1DataSlice from "../../State/S1DataSlice";

const ForcedUnforcedRadio = () => {
  const {
    dataOrigin,
    qSortPattern,
    isForcedQsortPattern,
    setQSortPattern,
    setShowForcedInput,
    setIsForcedQsortPattern,
    setRequireQsortPatternInput,
    setOldQsortPattern,
  } = S1DataSlice();

  const handleChange = (e: any) => {
    let value = e.target.value;
    let hasQsortPattern = [...qSortPattern];

    // if "UNFORCED" is selected
    if (value === "unforced") {
      setShowForcedInput(true);
      setIsForcedQsortPattern(false);
      setRequireQsortPatternInput(true);
      if (dataOrigin === "csv" || dataOrigin === "json") {
        setOldQsortPattern([...hasQsortPattern]);
        setQSortPattern([]);
      }
    } else {
      // if FORCED is selected
      let oldQsortPattern = [...hasQsortPattern];
      setShowForcedInput(false);
      setIsForcedQsortPattern(true);
      setRequireQsortPatternInput(false);
      if (dataOrigin === "csv" || dataOrigin === "json") {
        setQSortPattern([...oldQsortPattern]);
      }
    }
  };

  return (
    <div className="flex flex-col mt-2">
      <p className="text-left ml-4">Are Q sorts forced or unforced?</p>
      <div className="flex flex-row justify-start">
        <div className="form-control ml-8">
          <label className="cursor-pointer">
            <div className="flex flex-row justify-center items-center">
              <input
                type="radio"
                name="radio-6"
                value="forced"
                className="radio radio-lg checked:bg-blue-500"
                checked={isForcedQsortPattern === true}
                onChange={(e) => handleChange(e)}
              />
              <span className="ml-2">Forced</span>
            </div>
          </label>
        </div>
        <div className="form-control ml-8">
          <label className="cursor-pointer">
            <div className="flex flex-row justify-center items-center">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-lg checked:bg-blue-500"
                value="unforced"
                checked={isForcedQsortPattern === false}
                onChange={(e) => handleChange(e)}
              />
              <span className="ml-2">Unforced</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ForcedUnforcedRadio;

/*
<fieldset
      className="flex flex-col gap-4 ml-4 mr-4 mt-4 text-left"
      id="radio"
      onChange={handleChange}
    >
      <legend>Were Q sorts forced or unforced?</legend>
      <div className="flex items-center gap-2 ml-4 mt-2">
        <radio id="forced1" name="sorts" value="forced" defaultChecked={true} />
        <label htmlFor="forced1">Forced</label>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <radio id="unforced1" name="sorts" value="unforced" />
        <label htmlFor="unforced1">Unforced</label>
      </div>
    </fieldset>
    */
