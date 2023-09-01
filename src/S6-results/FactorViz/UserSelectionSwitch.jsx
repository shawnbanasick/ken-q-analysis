import React, { useState } from "react";
import "./UserSelectionSwitch.css";
import BatsuMark from "./batsuMark";
import CheckMark from "./checkMark";
import S6DataSlice from "../../State/S6DataSlice";
import Toggle from "react-toggle";

const UserSelectionSwitch = (props) => {
  const [toggle, setToggle] = useState(props.toggle);

  const {
    factorVizOptionsHolder,
    setFactorVizOptionsHolder,
    setUpdateFactorVisualizationsButtonColor,
  } = S6DataSlice();

  const clickToggle = (e) => {
    e.stopPropagation();
    const oldValue = toggle;
    const newValue = !oldValue;
    const key = props.value;
    factorVizOptionsHolder[key] = newValue;
    setToggle(newValue);

    setFactorVizOptionsHolder(factorVizOptionsHolder);
    setUpdateFactorVisualizationsButtonColor("bg-orange-300");
  };

  return (
    <div className="flex flex-row justify-center mr-2">
      <Toggle
        id={props.name}
        name={props.name}
        defaultChecked={props.toggle}
        onChange={(e) => clickToggle(e)}
        icons={{
          checked: <CheckMark />,
          unchecked: <BatsuMark />,
        }}
      />
    </div>
  );
};

export default UserSelectionSwitch;

/*
 */
