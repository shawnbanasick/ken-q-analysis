import React, { useState } from "react";
import RotationDegreeInput from "./RotationDegreeInput";
import S4DataSlice from "../../../State/S4DataSlice";
import OnGrayGeneralButton from "../../../ReusableComponents/OnGrayGeneralButton";

const RotationButtons = () => {
  const {
    shouldShowJudgeRotDiv,
    highlightDegreeInputButton,
    highlightDegreeButton1,
    highlightDegreeButton3,
    highlightDegreeButton4,
    highlightDegreeButton5,
    setRotateByDegrees,
    rotationDegreeInput,
    setHighlightDegreeButton1,
    setHighlightDegreeButton2,
    setHighlightDegreeButton3,
    setHighlightDegreeButton4,
    setHighlightDegreeButton5,
    setHighlightDegreeInputButton,
    setRotationDegreeInput,
  } = S4DataSlice();

  const shouldDisplayDegreeButtonButtons = shouldShowJudgeRotDiv;

  const [highlight, setHighlight] = useState(false);
  const [degreeInput, setDegreeInput] = useState(0);

  const handleDegreeClick = (event) => {
    setRotationDegreeInput(degreeInput);
    setRotateByDegrees(degreeInput);
    setHighlight(true);
    setHighlightDegreeButton1(false);
    setHighlightDegreeButton2(false);
    setHighlightDegreeButton3(false);
    setHighlightDegreeButton4(false);
    setHighlightDegreeButton5(false);
  };

  const getRotationDegreeFromUI = (event) => {
    const value = event.target.value;
    // clean input
    if (isNaN(value)) {
      return;
    }
    setRotationDegreeInput(+value);
    setDegreeInput(+value);
    // localStore.pressed = true;

    // clear all button highlighting
    setHighlightDegreeInputButton(true);
    setHighlightDegreeButton1(false);
    setHighlightDegreeButton2(false);
    setHighlightDegreeButton3(false);
    setHighlightDegreeButton4(false);
    setHighlightDegreeButton5(false);
    setRotateByDegrees(+value);
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    // clear all button highlighting
    setHighlight(false);
    setHighlightDegreeButton1(false);
    setHighlightDegreeButton2(false);
    setHighlightDegreeButton3(false);
    setHighlightDegreeButton4(false);
    setHighlightDegreeButton5(false);
    setHighlightDegreeInputButton(false);

    if (buttonId === "Button1Degree") {
      setHighlightDegreeInputButton(false);
      setHighlightDegreeButton1(true);
      setRotateByDegrees(1);
    }

    if (buttonId === "Button5Degrees") {
      setHighlightDegreeInputButton(false);
      setHighlightDegreeButton3(true);
      setRotateByDegrees(5);
    }

    if (buttonId === "Button10Degrees") {
      setHighlightDegreeInputButton(false);
      setHighlightDegreeButton4(true);
      setRotateByDegrees(10);
    }

    if (buttonId === "Button90Degrees") {
      setHighlightDegreeInputButton(false);
      setHighlightDegreeButton5(true);
      setRotateByDegrees(90);
    }
  };

  let button1Color = highlightDegreeButton1 ? "bg-green-300" : "bg-gray-100";
  let button3Color = highlightDegreeButton3 ? "bg-green-300" : "bg-gray-100";
  let button4Color = highlightDegreeButton4 ? "bg-green-300" : "bg-gray-100";
  let button5Color = highlightDegreeButton5 ? "bg-green-300" : "bg-gray-100";
  let degreeInputColor = highlightDegreeInputButton
    ? "bg-green-300"
    : "bg-gray-100";

  if (shouldDisplayDegreeButtonButtons) {
    return (
      <>
        <div className="m-1">
          <OnGrayGeneralButton
            buttonText={`${1}\u00B0`}
            buttonId={"Button1Degree"}
            buttonColor={button1Color}
            handleClick={handleOnclick}
          />
        </div>
        <div className="m-1">
          <OnGrayGeneralButton
            buttonText={`${5}\u00B0`}
            buttonId={"Button5Degrees"}
            buttonColor={button3Color}
            handleClick={handleOnclick}
          />
        </div>
        <div className="m-1">
          <OnGrayGeneralButton
            buttonText={`${10}\u00B0`}
            buttonId={"Button10Degrees"}
            buttonColor={button4Color}
            handleClick={handleOnclick}
          />
        </div>
        <div className="m-1">
          <OnGrayGeneralButton
            buttonText={`${90}\u00B0`}
            buttonId={"Button90Degrees"}
            buttonColor={button5Color}
            handleClick={handleOnclick}
          />
        </div>
        <RotationDegreeInput
          name="rotationDegrees"
          value={rotationDegreeInput}
          className={`btn ${degreeInputColor} hover:bg-gray-400`}
          // pressed={localStore.pressed}
          // isActive={highlightDegreeInputButton}
          onChangeCallback={getRotationDegreeFromUI}
          highlight={highlight}
          handleDegreeClick={handleDegreeClick}
        />
      </>
    );
  }
  return null;
};

export default RotationButtons;

/*
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const button = styled.div`
  width: 50px;
`;
*/
