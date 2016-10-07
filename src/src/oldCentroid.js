//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

// JSlint declarations
/* global localStorage: false, console: false, $: false, _: false, UTIL, document: false*/


/***********************************************************
            imports
                qavOriginalSortSize
                qavRespondentNames
                qavRespondentSortsFromDbStored
                qavTotalNumberSorts

            exports 
 
 ***********************************************************/



//
//"columnDefs": [{
//    targets: [2, 3, 5, 6],
//    className: 'dt-body-right',
//}, {
//    targets: [0, 1, 4, 7],
//    className: 'dt-body-center'
//}, {
//    targets: [0],
//    orderData: [0, 1]
//}, {
//    targets: [2],
//    orderData: [2]
//}, {
//    targets: [3],
//    orderData: [3]
//}, {
//    targets: [4],
//    orderData: [4, 3]
//}, {
//    targets: [5],
//    orderData: [5]
//}, {
//    targets: [6],
//    orderData: [6]
//}, {
//    targets: [7],
//    orderData: [7, 6]
//}],
//


// helper functions

/*******************************************************************************
 *******************************************************************************
 *******************************************************************************
 *********   WITH UNIT TESTS IN JASMINE   **************************************
 *******************************************************************************
 *******************************************************************************
 *******************************************************************************
 ******************************************************************************/


// todo - dry out repeated functions - getDataColumnTotals() and calculateColumnSums()