import React, { useState } from "react";
import S6DataSlice from "../../State/S6DataSlice";

const UserNumberInput = (props) => {
  const [value, setValue] = useState(props.value);
  const [showWarning, setShowWarning] = useState(false);
  const {
    factorVizOptionsHolder,
    setFactorVizOptionsHolder,
    setUpdateFactorVisualizationsButtonColor,
  } = S6DataSlice();

  const handleChange = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return null;
    }
    const key = props.name;
    setShowWarning(false);
    const upperLimit = props.upperLimit;
    const lowerLimit = props.lowerLimit;
    if (value < lowerLimit || value > upperLimit) {
      setValue(value);
      setShowWarning(true);
    } else {
      setValue(value);
      factorVizOptionsHolder[key] = value;
      setFactorVizOptionsHolder(factorVizOptionsHolder);
      setUpdateFactorVisualizationsButtonColor(
        "bg-orange-300 hover:bg-orange-400"
      );
    }
  };

  const warningMessage = `${"Lower Limit"}: ${
    props.lowerLimit
  }, ${"Upper Limit"}: ${props.upperLimit}`;

  return (
    <div className="flex flex-row w-[400px]">
      <input
        type="number"
        placeholder={props.placeholder}
        name={props.name}
        step={props.step}
        value={value}
        onChange={handleChange}
        className="color-black cursor-pointer mb-0 w-[60px] rounded-md box-border h-[25px] border-[1px] border-gray-500 box-shadow-none outline-none transition-0.15s text-align-center hover:outline-none hover:bg-none hover:box-shadow-none pl-2"
      />
      {showWarning ? (
        <div className="ml-1 pt-[4px] pl-1 pr-1 bg-red-100 h-[25px] w-auto text-black-900 ">
          {warningMessage}
        </div>
      ) : null}
    </div>
  );
};

export default UserNumberInput;

/*
const NumberInput = styled.input.attrs({
  type: "number",
})`
  color: black;
  cursor: pointer;
  margin-bottom: 0;
  width: 75px;
  border-radius: 5px;
  box-sizing: border-box;
  height: 25px;
  border: 1px solid lightgray;
  box-shadow: none;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:hover {
    outline: none;
    background: none;
    box-shadow: none;
  }
`;

const NumberWarningMessage = styled.div`
  margin-left: 10px;
  padding-top: 4px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: lightpink;
  color: black;
  height: 25px;
  width: auto;
`;

const UserNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
`;
*/
