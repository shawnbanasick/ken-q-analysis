import React from "react";
import store from "../../../store";
import { Input } from "semantic-ui-react";

const handleChange = function(e) {
  store.setState({
    projectName: e.target.value,
    projectHistoryArray: [e.target.value + " data loaded from CSV file"]
  });
};

const ProjectNameInput = () => (
  <Input
    style={{ width: "100%" }}
    onChange={e => handleChange(e)}
    label="Project Name:"
    placeholder="name"
  />
);

export default ProjectNameInput;
