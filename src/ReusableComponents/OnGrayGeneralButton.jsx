import React from "react";

const OnGrayGeneralButton = (props) => {
  let {
    handleClick,
    buttonText,
    buttonColor,
    buttonId,
    disabled,
    otherFormatting,
  } = props;

  if (buttonColor === undefined) {
    buttonColor = "bg-gray-100 hover:bg-gray-400";
  }

  return (
    <>
      <button
        id={buttonId}
        className={`btn text-black ${buttonColor} ${otherFormatting} rounded-md hover:bg-gray-400 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-70`}
        onClick={handleClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </>
  );
};

export default OnGrayGeneralButton;

/*
default bg-gray-100
*/
