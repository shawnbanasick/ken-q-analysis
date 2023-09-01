import React from "react";
import SplitBipolarFactorDropdownSelect from "./SplitBipolarFactorDropdownSelect";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";
import OnWhiteGeneralButton from "../../ReusableComponents/OnWhiteGeneralButton";

const SplitBipolarFactorButtonModal = (props) => {
  const onClick = () => {
    window.splitBipolarFactorModal.showModal();
  };

  return (
    <>
      <dialog id="splitBipolarFactorModal" className="modal">
        <form method="dialog" className="modal-box border-2 border-gray-600">
          <SplitBipolarFactorDropdownSelect />
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
        </form>
      </dialog>
      <OnGrayGeneralButton
        id="splitFactorsButton"
        buttonColor="bg-gray-100"
        handleClick={onClick}
        otherFormatting="m-1 ml-4 mr-8"
        buttonText="Split Bipolar Factor"
      />
    </>
  );
};

export default SplitBipolarFactorButtonModal;
