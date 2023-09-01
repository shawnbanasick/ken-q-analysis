const getCssStyles = parentElement => {
    var selectorTextArr = [];

    // Add Parent element Id and Classes to the list
    selectorTextArr.push("#" + parentElement.id);
    for (let c = 0; c < parentElement.classList.length; c++)
        if (!contains("." + parentElement.classList[c], selectorTextArr))
            selectorTextArr.push("." + parentElement.classList[c]);

    // Add Children element Ids and Classes to the list
    var nodes = parentElement.getElementsByTagName("*");
    for (var i = 0; i < nodes.length; i++) {
        var id = nodes[i].id;
        if (!contains("#" + id, selectorTextArr)) selectorTextArr.push("#" + id);

        var classes = nodes[i].classList;
        for (let c = 0; c < classes.length; c++)
            if (!contains("." + classes[c], selectorTextArr))
                selectorTextArr.push("." + classes[c]);
    }

    // Extract CSS Rules
    var extractedCSSText = "";
    for (let i = 0; i < document.styleSheets.length; i++) {
        var s = document.styleSheets[i];

        try {
            if (!s.cssRules) continue;
        } catch (e) {
            if (e.name !== "SecurityError")
                throw e; // for Firefox
            continue;
        }

        var cssRules = s.cssRules;
        for (let r = 0; r < cssRules.length; r++) {
            if (contains(cssRules[r].selectorText, selectorTextArr))
                extractedCSSText += cssRules[r].cssText;
        }
    }
    return extractedCSSText;

    function contains(str, arr) {
        return arr.indexOf(str) === -1 ? false : true;
    }
};

export default getCssStyles;
