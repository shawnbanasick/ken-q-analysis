import React from "react";
import { Button } from "semantic-ui-react";
import { uploadLipsetData } from "./lipsetData";
import { easyComp } from "react-easy-state";

const LipsetButton1 = () => (
    <div>
      <Button id="lipsetButton" floated="right" size={ "large" } onClick={ uploadLipsetData }>
        Lipset
      </Button>
    </div>
);

export default easyComp(LipsetButton1);

