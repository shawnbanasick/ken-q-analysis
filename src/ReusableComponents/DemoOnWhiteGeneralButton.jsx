import React from "react";

const OnWhiteGeneralButton = (props) => {
  const { handleClick, buttonText, buttonColor } = props;

  return (
    <>
      <button
        id="onWhiteGeneralButton"
        className={`btn text-black ${buttonColor} rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-70`}
        onClick={handleClick}
      >
        <svg
          className="fill-current w-4 h-4 mr-2 rotate-180"
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

export default OnWhiteGeneralButton;
