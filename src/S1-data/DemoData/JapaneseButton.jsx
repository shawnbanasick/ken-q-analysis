import React from "react";
import { Button } from "semantic-ui-react";
import { easyComp } from "react-easy-state";
import japaneseData from "./japaneseData";

const JapaneseButton = () => (
    <div>
      <Button id="japaneseButton" floated="right" size={ "large" } onClick={ japaneseData }>
        iPad
      </Button>
    </div>
);

export default easyComp(JapaneseButton);
