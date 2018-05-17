import React from "react";
import { Button } from "semantic-ui-react";
import { easyComp } from "react-easy-state";
import kocData from "./kocData";

const KocButton = () => (
    <div>
      <Button id="kocButton" inverted floated="right" size={ "large" } color="blue" onClick={ kocData }>
        KOC
      </Button>
    </div>
);

export default easyComp(KocButton);
