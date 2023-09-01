import React from "react";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const KadeButton = () => (
  <div className="mb-6">
    <a
      href="https://github.com/shawnbanasick/kade"
      target="_blank"
      rel="noopener noreferrer"
    >
      <OnGrayGeneralButton
        id="kadeLink"
        buttonText="KADE"
        buttonColor="bg-gray-100"
      />
    </a>
  </div>
);

export default KadeButton;
