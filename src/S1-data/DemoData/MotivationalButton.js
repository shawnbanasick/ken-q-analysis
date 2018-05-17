import React from "react";
import { Button } from "semantic-ui-react";
import { easyComp } from "react-easy-state";
import uploadMotivationalData from "./MotivationData";

const motivationalButton = () => (
    <div>
      <Button id="motivationalButton" floated="right" size={ "large" } onClick={ uploadMotivationalData }>
        Motivation
      </Button>
    </div>
);

export default easyComp(motivationalButton);
