import React from "react";

const ExportGeneralButton = (props) => {
  let { handleClick, buttonText, buttonColor, otherFormatting } = props;

  if (buttonColor === undefined) {
    buttonColor = "bg-gray-100 hover:bg-gray-400";
  }

  return (
    <>
      <button
        id="ExportGeneralButton"
        className={`btn text-black m-2 ${buttonColor} ${otherFormatting} rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-70`}
        onClick={handleClick}
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        {buttonText}
      </button>
    </>
  );
};

export default ExportGeneralButton;
