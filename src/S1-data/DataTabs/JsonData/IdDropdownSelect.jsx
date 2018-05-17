import store from "../../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import displayJsonData from "./displayJsonData";
import { Dropdown, Grid } from "semantic-ui-react";
import "./IdDropdownSelect.css";

class IdDropdownSelect extends Component {
  state = {};

  handleChange = (e, { value }) => {
    let selection = {
      value
    };
    displayJsonData(selection);
    this.setState({
      value
    });
  };

  render() {
    const options = store.getState("jsonParticipantId");

    const { value } = this.state;

    return (
      <Grid
        className="jsonGrid"
        columns={2}
        width={20}
        style={{ marginTop: 20 }}
      >
        <Grid.Row textAlign="center">
          <Grid.Column className="jsonGridColumnA" width={7}>
            <span className="jsonTextSpan">Select participant id:</span>
          </Grid.Column>
          <Grid.Column width={9}>
            <Dropdown
              fluid
              onChange={this.handleChange}
              options={options}
              placeholder="Select id"
              selection
              value={value}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default easyComp(IdDropdownSelect);
