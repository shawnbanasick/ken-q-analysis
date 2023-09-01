import S4DataSlice from "../../../State/S4DataSlice";
import cloneDeep from "lodash/cloneDeep";

// todo - basically, just to trigger component update - see if delete possible
const data = () => {
  // getState
  const newRotationVectors = cloneDeep(S4DataSlice.getState().d3RotChartData);
  S4DataSlice.setState({ newRotationVectors: newRotationVectors });
};

export default data;
