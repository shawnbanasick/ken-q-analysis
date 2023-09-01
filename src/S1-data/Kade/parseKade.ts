const parseKade = (data: string): Array<string | number>[] => {
  const result = data.split(/\r?\n/).filter((element) => element);

  // delimiter check - comma or semicolon
  const commaLen = result[0].split(",").length - 1;
  const semiLen = result[0].split(";").length - 1;

  let result2: Array<string | number>[];
  if (commaLen > semiLen) {
    result2 = result.map((element) =>
      element
        .split(",")
        .filter((element) => element)
        .map((element, index) => {
          element.trim();

          if (index > 0) {
            return parseInt(element, 10);
          }
          return element;
        })
    );
  } else {
    result2 = result.map((element) =>
      element
        .split(";")
        .filter((element) => element)
        .map((element, index) => {
          element.trim();

          if (index > 0) {
            return parseInt(element, 10);
          }
          return element;
        })
    );
  }
  // console.log(JSON.stringify(result2));

  return result2;
};

export default parseKade;
