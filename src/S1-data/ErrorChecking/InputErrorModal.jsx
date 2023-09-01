import React from "react";
import S1DataSlice from "../../State/S1DataSlice";
import OnWhiteGeneralButton from "../../ReusableComponents/OnWhiteGeneralButton";

const InputErrorModal = () => {
  const { showInputErrorModal } = S1DataSlice();

  if (showInputErrorModal.showModal) {
    window.inputErrorModal.showModal();
    showInputErrorModal.showModal = false;
    //setShowInputErrorModal({ ...showInputErrorModal });
  }

  return (
    <dialog id="inputErrorModal" className="modal">
      <form
        method="dialog"
        className="modal-box border-2 border-gray-600 rounded-md"
      >
        <p id="titleText" className="text-2xl mb-2 font-bold">
          {showInputErrorModal.titleText}
        </p>
        <hr className="w-full mb-6 border border-gray-700" />
        <p className="w-[350px] text-center">{showInputErrorModal.bodyText}</p>
        <p className="mt-4 w-[350px] text-center">
          {showInputErrorModal.bodyText2}
        </p>
        <div className="">
          <div className="flex flex-row w-[450px] place-content-around mt-2 mb-2">
            <OnWhiteGeneralButton
              id="inputErrorModalCloseButton"
              buttonColor="bg-gray-300"
              otherFormatting="modal-action"
              buttonText="Close"
            />
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default InputErrorModal;

/*
              <OnWhiteGeneralButton
                id="invertFactorSubmitButton"
                buttonColor="bg-green-300"
                otherFormatting="modal-action"
                buttonText="Submit"
                handleClick={props.handleClick}
              />
  
            */
