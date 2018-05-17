import React, { Component } from "react";
import { Form, Radio } from "semantic-ui-react";
import store from "../../../store";

store.setState({
  isForcedQsortPattern: true
});

export default class RadioExampleRadioGroup extends Component {
  state = {
    value: "forced"
  };
  handleChange = (e, { value }) => {
    this.setState({
      value
    });

    // if "UNFORCED" is selected
    let hasQsortPattern = store.getState("qSortPattern");
    let dataOrigin = store.getState("dataOrigin");
    if (value === "unforced") {
      store.setState({
        showForcedInput: true,
        isForcedQsortPattern: false,
        requireQsortPatternInput: true
      });
      if (dataOrigin === "csv" || dataOrigin === "json") {
        store.setState({
          oldQsortPattern: hasQsortPattern,
          qSortPattern: []
        });
      }
    } else {
      // if FORCED is selected
      let oldQsortPattern = store.getState("oldQsortPattern");
      store.setState({
        showForcedInput: false,
        isForcedQsortPattern: true,
        requireQsortPatternInput: false
      });
      if (dataOrigin === "csv" || dataOrigin === "json") {
        store.setState({
          qSortPattern: oldQsortPattern
        });
      }
    }
  };

  render() {
    return (
      <Form style={{ marginTop: 30, marginBottom: 15 }}>
        <Form.Field style={{ fontSize: 20, marginBottom: 0, marginLeft: 20 }}>
          Q Sorts are: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field style={{ marginBottom: 6, marginLeft: 25 }}>
          <Radio
            label="Forced"
            name="radioGroup"
            value="forced"
            checked={this.state.value === "forced"}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field style={{ marginLeft: 25 }}>
          <Radio
            label="Unforced"
            name="radioGroup"
            value="unforced"
            checked={this.state.value === "unforced"}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    );
  }
}
