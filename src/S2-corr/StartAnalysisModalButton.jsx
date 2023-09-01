import React from "react";
// import { mainCorrCalcs } from "./corrLogic/mainCorrCalcs";
import doInputErrorCheck from "../S1-data/ErrorChecking/ErrorChecking/doInputErrorCheck";

let checkForErrors = [[""], [["", "", ""]], [""]];

const StartAnalysisButtonModal = () => {
  // const store = {
  // modalOpen: false,
  // errorMessage1: "",
  // errorMessage2: "",
  // errorMessage3: "",
  // errorMessage4: "",
  // };

  const handleOpen = () => {
    doInputErrorCheck();
    window.my_modal_1.showModal();
    /*
    checkForErrors = doInputErrorCheck();

    // returns multiple values
    if (checkForErrors[0] === true) {
      // this.store.errorMessage1 = checkForErrors[1][0];
      // this.store.errorMessage2 = checkForErrors[1][1];
      // this.store.errorMessage3 = checkForErrors[1][2];
      // this.store.errorMessage4 = checkForErrors[3];
      // this.store.modalOpen = true;
    } else {
      // start analysis with delay to show spinner
      // store.setState({ isLoadingBeginAnalysis: true });
      setTimeout(() => {
        let respondentNames = checkForErrors[4];
        let rawSortsArray = checkForErrors[5];
        mainCorrCalcs(respondentNames, rawSortsArray);
        // store.setState({
        //  showFactorExtractionButtons: true
        // });
      }, 10);
    }
    */
  };
  /*
  let open = true;
  if (open) {
    // window.my_modal_1.showModal();
  }
  */

  const handleClose = () => {
    // this.store.modalOpen = false;
  };

  // let isActive = store.getState("activeStartAnalysisButton");
  // let isLoadingBeginAnalysis = store.getState("isLoadingBeginAnalysis");
  return (
    <>
      <button className="btn" onClick={() => handleOpen()}>
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box border-2 border-gray-600">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
    /*
    <div
      trigger={
        <button
          id="factorsKeptSubmitButton"
          className="btn"
          // loading={isLoadingBeginAnalysis}
          onClick={handleOpen}
        >
          Begin Analysis
        </button>
      }
    >
      <div content="Error Checking" />
      <div>
        <span style={{ fontSize: 30, display: "block" }}></span>
        <span style={{ fontSize: 22, display: "block" }}></span>
        <hr />
      </div>
      <div>
        <button
          id="startAnalysisModalGotItButton"
          onClick={handleClose}
        ></button>
      </div>
      <div>
        <span style={{ fontSize: 30, display: "block", marginTop: 35 }}></span>
        <span style={{ fontSize: 22, display: "block", marginTop: 15 }}></span>
      </div>
    </div>
    */
  );
};

export default StartAnalysisButtonModal;
