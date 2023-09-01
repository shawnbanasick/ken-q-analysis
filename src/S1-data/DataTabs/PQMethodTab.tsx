import PQMethodStatementCard from "../PQMethod/PQMethodStatementCard";
import PQMethodQsortsCard from "../PQMethod/PQMethodQsortsCard";
// import UnforcedWarningModal from "../UploadFile/ErrorChecking/UnforcedWarningModal";
import React from "react";
import "../CSV/modal.css";
import S1DataSlice from "../../State/S1DataSlice";

const stopProp = (e: any) => {
  e.stopPropagation();
};

const LoginOverlay = ({ removeOverlay }: any) => {
  const { csvErrorMessage1 } = S1DataSlice();

  return (
    <div className="overlay_background" onClick={(e) => removeOverlay()}>
      <div
        className="overlay_card p-8 min-h-[400px] min-w-[600px]"
        onClick={(e) => stopProp(e)}
      >
        <div className="mb-4 border-bottom">
          <span style={{ fontSize: 40, display: "block" }}>
            There was a file read error!
          </span>
        </div>
        <div className="m-4">
          <span style={{ fontSize: 30, display: "block" }}>
            {csvErrorMessage1}
          </span>
        </div>
        <span style={{ fontSize: 30, display: "block" }}>
          Please check your PQMethod file data and try again
        </span>
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            removeOverlay();
          }}
        >
          <button className="btn btn-primary form_submit " type="submit">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

const PQMethodTab = () => {
  const { showCsvErrorModal, setShowCsvErrorModal } = S1DataSlice();

  return (
    <div
      id="modal-root"
      className="flex flex-row rounded-md p-8 pt-2 bg-gray-300 min-w-[700px] min-h-[600px]"
    >
      <div>
        <PQMethodStatementCard />
      </div>
      <PQMethodQsortsCard />

      <div className={showCsvErrorModal ? "overlay_shown" : "overlay_hidden"}>
        <LoginOverlay
          removeOverlay={() => {
            setShowCsvErrorModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default PQMethodTab;
