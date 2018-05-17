import isNumber from 'lodash/isNumber';

const sanitizeUserInputText = function(input) {
  if (isNumber(input)) {
    return input;
  } else {
    console.log(input);

    var output = input
      // todo - check this - removed due to linter error report "unnecessary"
      //.replace(/<script[^>]*?>.*?<\/<\/script>/gi, "")
      .replace(/<script[^>]*?>.*?<\/script>/gi, "")

      // todo - check this - removed due to linter error report "unnecessary"
      // .replace(/<[\/\!]*?[^<>]*?>/gi, "")
      .replace(/<*?[^<>]*?>/gi, "")
      .replace(/<style[^>]*?>.*?<\/style>/gi, "")
      .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "");
    // QAV.setState("output", output);
    return output;
  }
};

export default sanitizeUserInputText;
