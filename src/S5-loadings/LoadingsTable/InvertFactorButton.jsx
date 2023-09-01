import React from "react";
//import invertFactor from "../loadingsLogic/invertFactor";
import InvertFactorDropdownSelect from "./InvertFactorDropdownSelect";
import S5DataSlice from "../../State/S5DataSlice";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";
import OnWhiteGeneralButton from "../../ReusableComponents/OnWhiteGeneralButton";

const InvertFactorButtonModal = (props) => {
  const { bipolarDisabled } = S5DataSlice();

  const handleOpen = () => {
    window.invertFactorModal.showModal();
  };

  return (
    <>
      <dialog id="invertFactorModal" className="modal">
        <form method="dialog" className="modal-box border-2 border-gray-600">
          <InvertFactorDropdownSelect />
          <div className="">
            <div className="flex flex-row w-[450px] place-content-around mt-8">
              <OnWhiteGeneralButton
                id="invertFactorCancelButton"
                buttonColor="bg-gray-300"
                otherFormatting="modal-action"
                buttonText="Cancel"
              />
              <OnWhiteGeneralButton
                id="invertFactorSubmitButton"
                buttonColor="bg-green-300"
                otherFormatting="modal-action"
                buttonText="Submit"
                handleClick={props.handleClick}
              />
            </div>
          </div>
        </form>
      </dialog>
      <OnGrayGeneralButton
        id="invertFactorsButton"
        handleClick={handleOpen}
        buttonColor="bg-gray-100"
        otherFormatting="m-1 ml-4 mr-8"
        disabled={bipolarDisabled}
        buttonText="Invert Factor"
      />
    </>
  );
};

export default InvertFactorButtonModal;

/*
  
            */
