import React from "react";

const OnWhiteGeneralButton = (props) => {
  const { handleClick, buttonText, buttonColor, otherFormatting } = props;

  return (
    <>
      <button
        id="onWhiteGeneralButton"
        className={`btn text-black ${buttonColor} ${otherFormatting} hover:bg-gray-400 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-70`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </>
  );
};

export default OnWhiteGeneralButton;
