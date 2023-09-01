const modifySortPattern = (sortPattern: Array<Array<any>>) => {
  let sortPattern2: Array<number> = sortPattern[0].map(
    (element: any, index: number) => {
      if (index === 0) {
        return parseInt(element, 10);
      } else {
        return element;
      }
    }
  );

  return sortPattern2;
};

export default modifySortPattern;
