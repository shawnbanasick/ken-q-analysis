import cloneDeep from "lodash/cloneDeep";
import checkUniqueName from "../DataDisplay/checkUniqueParticipantName";

const createParticipantNameArray = (array: Array<any>) => {
  let tempArray: string[] = [];
  let result: Array<any> = cloneDeep(array);
  result.forEach((element: Array<any>) => {
    let tempVar = element[0];
    tempArray.push(tempVar);
  });
  let participantNames = checkUniqueName(tempArray);
  return participantNames;
};

export default createParticipantNameArray;
