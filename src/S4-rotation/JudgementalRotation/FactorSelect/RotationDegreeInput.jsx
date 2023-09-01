import React from "react";

const RotationDegreeInput = (props) => {
  const saveInputValueToState = (event) => {
    props.onChangeCallback(event);
  };

  const registerClick = (event) => {
    props.handleDegreeClick(event);
  };

  let backgroundColor = "border-gray-400";
  if (props.highlight) {
    backgroundColor = "border-green-300";
  }

  return (
    <input
      type="text"
      id="degreeInput"
      name={props.name}
      className={`text-base font-bold w-16 h-12 text-center border-8 ml-2 ${backgroundColor} rounded-md hover:border-gray-500 focus:outline-none`}
      onChange={saveInputValueToState}
      value={props.value}
      onClick={registerClick}
    />
  );
};

export default RotationDegreeInput;
