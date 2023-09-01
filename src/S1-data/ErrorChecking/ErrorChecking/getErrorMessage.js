const getErrorMessage = (isForcedQsortPattern, isGoodQsortPattern) => {
    // wrong length q-sorts
    if (isGoodQsortPattern === false) {
        let message1 = `The Q-sort pattern doesn't match the number of statements`;
        let message2 = "Check your data, reload the page, and try again";
        let message3 = "Non-symmetric (unforced) Q sorts:";
        return [message1, message2, message3];
    }

    // non-symmetric sorts
    if (isForcedQsortPattern === true) {
        let message1 = `There are non-symetric Q sorts`;
        let message2 = "If the study contains unforced sorts, select the unforced radio button";
        let message3 = "Non-symmetric (unforced) Q sorts:";
        return [message1, message2, message3];
    }

    // out of range values
    if (isForcedQsortPattern === false) {
        let message1 = `There are Q sorts with incorrect data values`;
        let message2 = "Check your data, reload the page, and try again";
        let message3 = "Q sorts with errors:";
        return [message1, message2, message3];
    }

};

export default getErrorMessage;

/*
    let errorMessage2 = "Check your data, reload the page, and try again";
    let errorMessage3 = "Non-symmetric (unforced) Q sorts:";
*/
