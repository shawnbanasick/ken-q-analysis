import { saveSvgAsPng } from "save-svg-as-png";
import currentDate from "../../Utils/currentDate1";
import currentTime from "../../Utils/currentTime1";
import S1DataSlice from "../../State/S1DataSlice";

const downloadPngImage = () => {
  // getState
  const projectName = S1DataSlice.getState().projectName;
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date}_${time}`;
  const filename = `${projectName}-scree_plot_${dateTime}`;

  saveSvgAsPng(document.getElementById("screePlot"), filename, {
    encoderOptions: 1,
  });
};

export default downloadPngImage;
