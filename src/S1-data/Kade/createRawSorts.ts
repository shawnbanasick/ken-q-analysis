import cloneDeep from "lodash/cloneDeep";

const createRawSorts = (sortsInput: any) => {
  // create copy of array
  let sortsInputCopy = cloneDeep(sortsInput);

  let newRawSorts: number[] = [];
  const sorts = sortsInputCopy.map((sort: Array<any>) => {
    // remove first entry from each array and push into newRawSorts
    newRawSorts.push(sort.shift());
    return sort;
  });
  return sorts;
};

export default createRawSorts;
