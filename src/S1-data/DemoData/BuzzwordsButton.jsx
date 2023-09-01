import React from "react";
import { Button } from "semantic-ui-react";
import { easyComp } from "react-easy-state";
import buzzwordsData from "./buzzwordsData";

const BuzzwordsButton = () => (
    <div>
      <Button id="BuzzwordsButton" floated="right" size={ "large" } onClick={ buzzwordsData }>
        Buzzwords
      </Button>
    </div>
);

export default easyComp(BuzzwordsButton);
