const parseParticipantNames = (jsonData: any[][]) => {
  let namesArray: string[] = [];
  let sortsArray: number[] = [];
  jsonData.forEach((participant: any) => {
    let name = participant.shift();
    namesArray.push(name);
    sortsArray.push(participant);
    console.log("name: ", name);
    console.log("participant: ", participant);
  });
  /*  
  const participantNames = jsonData.map((participant: any) => {
    return participant[0];
  });
  console.log("participantNames: ", participantNames);
  */
  return { namesArray, sortsArray };
};

export default parseParticipantNames;
