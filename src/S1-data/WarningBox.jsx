import React from "react";
import S1DataSlice from "../State/S1DataSlice";

const WarningBox = () => {
  let { showWarningBox } = S1DataSlice();

  const reloadPage = (e) => {
    e.stopPropagation();
    window.location.reload();
  };

  if (showWarningBox) {
    return (
      <div className="flex flex-col p-10  h-[120px] items-center  bg-red-500 hover:bg-red-700 rounded-md">
        <p
          className="text-5xl text-white w-[600px] text-center rounded-md"
          onClick={reloadPage}
        >
          RELOAD REQUIRED
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default WarningBox;
