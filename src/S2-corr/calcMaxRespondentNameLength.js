import S2DataSlice from "../State/S2DataSlice";

const calcMaxRespondentNameLength = (respondentNames = []) => {
  // get max participant name length for col width
  let firstColMaxWidth = 0;

  let names = [...respondentNames];
  let longestName = names.reduce((a, b) => (a.length > b.length ? a : b));

  // const calColMaxWidth2 = Math.max(...respondentNames.map((el) => el.length));

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "14px Arial";
  var width = ctx.measureText(longestName).width;

  firstColMaxWidth = width + 30;

  if (firstColMaxWidth > 170) {
    firstColMaxWidth = 170;
  }

  S2DataSlice.setState({
    firstColMaxWidth: firstColMaxWidth,
  });
};

export default calcMaxRespondentNameLength;
