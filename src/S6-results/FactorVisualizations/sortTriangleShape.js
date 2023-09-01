import S1DataSlice from "../../State/S1DataSlice";

const sortTriangleShape = function () {
  const qSortPattern = S1DataSlice.getState().qSortPattern;
  // const qSortPattern = [
  //     -4,
  //     -4,
  //     -3,
  //     -3,
  //     -3,
  //     -2,
  //     -2,
  //     -2,
  //     -2,
  //     -1,
  //     -1,
  //     -1,
  //     -1,
  //     -1,
  //     0,
  //     0,
  //     0,
  //     0,
  //     0,
  //     1,
  //     1,
  //     1,
  //     1,
  //     1,
  //     2,
  //     2,
  //     2,
  //     2,
  //     3,
  //     3,
  //     3,
  //     4,
  //     4
  // ];

  return qSortPattern;
};

export default sortTriangleShape;
