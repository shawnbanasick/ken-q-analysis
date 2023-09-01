import React from "react";
import S5DataSlice from "../../State/S5DataSlice";

const MajorityCommonVarianceCheckbox = (props) => {
  let {
    requireMajorityCommonVariance,
    bipolarDisabled,
    setRequireMajorityCommonVariance,
  } = S5DataSlice();

  const toggle = () => {
    requireMajorityCommonVariance = !requireMajorityCommonVariance;
    setRequireMajorityCommonVariance(requireMajorityCommonVariance);
    props.clearAllCheckboxes();
  };

  const isChecked = requireMajorityCommonVariance;

  return (
    <>
      <label className="mr-2">Require Majority of Common Variance</label>
      <input
        id="majComVar"
        type="checkbox"
        checked={isChecked}
        disabled={bipolarDisabled}
        onChange={toggle}
      />
    </>
  );
};

export default MajorityCommonVarianceCheckbox;
