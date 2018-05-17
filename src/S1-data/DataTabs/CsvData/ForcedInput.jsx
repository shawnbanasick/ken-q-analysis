import React from "react";
import store from "../../../store";
import { Input } from "semantic-ui-react";
import { easyComp } from "react-easy-state";

class ForcedInput extends React.Component {
  handleChange(event) {
    let array = event.target.value;
    let qSortPatternArray2 = array.split(",");
    let qSortPatternArray = [];
    for (let num of qSortPatternArray2) {
      let value = parseInt(num, 10);
      if (!isNaN(value)) {
        qSortPatternArray.push(value);
      }
    }
    qSortPatternArray.sort(function(a, b) {
      return a - b;
    });
    store.setState({
      qSortPattern: qSortPatternArray
    });
  }

  render() {
    let showForcedInput = store.getState("showForcedInput");
    if (showForcedInput) {
      return (
        <div>
          <Input
            style={{ width: "100%" }}
            onChange={this.handleChange.bind(this)}
            label="Input Q-Sort Design"
            placeholder="sort values separated by commas"
          />
        </div>
      );
    } else {
      return <div style={{ height: 38 }} />;
    }
  }
}

export default easyComp(ForcedInput);

/*
class judgementalRotationContainer extends Component {
  render() {
    let shouldShowJudgeRotDiv = store.shouldShowJudgeRotDiv;
    return (
      <div>
        {shouldShowJudgeRotDiv && (
          <div style={styles}>
            <ScatterPlotDiv />
          </div>
        )}
      </div>
    );
  }
}
*/
