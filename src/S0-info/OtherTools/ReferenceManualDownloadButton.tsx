import React from "react";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const ReferenceManualDownloadButton = () => (
  <div className="mb-4">
    <a
      href="https://github.com/shawnbanasick/ken-q-analysis/wiki"
      target="_blank"
      rel="noopener noreferrer"
    >
      <OnGrayGeneralButton
        id="referenceGuideLink"
        buttonText="Reference Manual"
        buttonColor="bg-gray-100"
      />
    </a>
  </div>
);

export default ReferenceManualDownloadButton;
