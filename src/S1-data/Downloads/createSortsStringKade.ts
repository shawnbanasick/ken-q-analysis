const createSortsStringKade = (mainDataOject: any) => {
  let returnString = ``;
  mainDataOject.forEach((item: any, index: number) => {
    returnString += `${mainDataOject[index].name},${mainDataOject[index].displaySort}\n`;
  });
  return returnString;
};

export default createSortsStringKade;
