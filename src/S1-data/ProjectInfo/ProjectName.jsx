import React from "react";
import store from "../../store";
import { easyComp } from "react-easy-state";
import { Transition } from "semantic-ui-react";

const DisplayProjectName = () => {
  let projectName = store.getState("projectName");
  let isVisible;
  if (projectName === "unnamed project") {
    isVisible = false;
  } else {
    isVisible = true;
  }

  return (
    <Transition visible={isVisible} animation="fade" duration={1000}>
      <div style={{ marginTop: 30 }}>
        <h2>{projectName}</h2>
      </div>
    </Transition>
  );
};

export default easyComp(DisplayProjectName);
