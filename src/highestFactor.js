$.extend($.fn.dataTableExt.oSort, {
  "highestFactor-pre": function (a) {
    // Add / alter the switch statement below to match your enum list 

    var front = a.slice(0, 2);
    var back = a.slice(3, a.length);

    switch (front) {
    case "F1":
      return (parseInt(back));
    case "F2":
      return (parseInt(back) + 300);
    case "F3":
      return (parseInt(back) + 600);
    case "F4":
      return (parseInt(back) + 900);
    case "F5":
      return (parseInt(back) + 1200);
    case "F6":
      return (parseInt(back) + 1500);
    case "F7":
      return (parseInt(back) + 1800);
    default:
      return (parseInt(back) + 2100);
    }
  },

  "highestFactor-asc": function (a, b) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },

  "highestFactor-desc": function (a, b) {
    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});