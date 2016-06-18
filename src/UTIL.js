//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, localStorage, PCA, document, performance*/


(function (UTIL, undefined) {

    UTIL.drawDatatable = function (configObj) {
        $(configObj.domElement).DataTable({
            "fixedColumns": configObj.fixed,
            "retrieve": true,
            "searching": false,
            "ordering": configObj.ordering,
            "info": false,
            "destroy": true,
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "data": configObj.data,
            "columns": configObj.headers,
            "columnDefs": configObj.colDefs,
        });

        var table = $(configObj.domElement).DataTable();
        $(configObj.domElement + ' tbody')
            .on('mouseenter', 'td', function () {
                var colIdx = table.cell(this).index().column;
                $(table.cells().nodes()).removeClass('highlight');
                $(table.column(colIdx).nodes()).addClass('highlight');
            })
            .on('mouseleave', function () {
                $(table.cells().nodes()).removeClass('highlight');
                $(table.columns().nodes()).removeClass('highlight');
            });
    };

    UTIL.addFactorSelectCheckboxesRotation = function (loopLength) {
        //       
        // clear checkboxes if previously added to DOM
        var checkboxFrameCheck = $("#checkboxFrame");
        if (checkboxFrameCheck.length > 0) {
            checkboxFrameCheck.empty();
        }

        // add checkboxes to DOM according to number factors extracted
        for (var k = 0; k < loopLength; k++) {
            var incrementedK = k + 1;

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "radioCheck";
            checkbox.value = incrementedK;
            checkbox.className = "checkbox";
            checkbox.id = "checkChart" + incrementedK;

            var label = document.createElement('label');
            label.htmlFor = "checkChart" + incrementedK;
            label.className = "checkboxLabel";
            label.appendChild(document.createTextNode("Factor " + incrementedK));

            document.getElementById("checkboxFrame").appendChild(checkbox);
            document.getElementById("checkboxFrame").appendChild(label);
            // document.getElementById("checkboxFrame").appendChild(checkboxDiv1);
            // document.getElementById("checkboxFrame").appendChild(checkboxDiv1);
        }


    };

    // todo - remove autocomplete="off" from index.html and use this
    //    (function () {
    //        $(window).unload(function() {
    //            $('#existingDatabaseSelect select option').remove();
    //           
    //
    //        });
    //    })();
    //


}(window.UTIL = window.UTIL || {}));