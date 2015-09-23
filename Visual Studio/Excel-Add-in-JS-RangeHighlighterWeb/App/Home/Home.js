/* Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
    See full license at the bottom of this file. */

/// <reference path="../App.js" />

(function () {
	"use strict";

	var rowToHighlight;
	var rowsArray;

	// The initialize function must be run each time a new page is loaded
	Office.initialize = function (reason) {
		$(document).ready(function () {
			app.initialize();

			// Results is only shown if the user wants to see the data in the taskpane
			$("#results").hide();

			// Load some sample data into the active sheet
			loadSampleData();

			$('#go-button').click(function () {

				$("#results").hide();
				$("#results").empty();

				switch ($("#what-to-highlight").val()) {
					case "Highest in a range":
						hightlightHighestValue();
						break;
					case "First item in a range":
						hightlightFirstItem();
						break;
					case "Last item in a range":
						hightlightLastItem();
						break;
					case "Duplicate items in a range":
						hightlightDuplicateItems();
						break;
					case "Lowest in a range":
						hightlightLowestValue();
						break;
					default:
						hightlightLowestValue();
						break;
				}
			});

		});

		function loadSampleData() {

			// Run a batch operation against the Excel object model
			Excel.run(function (ctx) {

				// Create a proxy object for the active sheet
				var sheet = ctx.workbook.worksheets.getActiveWorksheet();

				// Queue commands to set the title
				sheet.getRange("A1:A1").values = "Product Inventory";
				sheet.getRange("A1:A1").format.font.name = "Century";
				sheet.getRange("A1:A1").format.font.size = 26;


				// Some sample data
				var values = [["Product", "Qty", "Sales", "Demand"],
							  ["Frames", 450, 7000, 10],
							  ["Saddles", 275, 3400, 23],
							  ["Brake levers", 75, 8766, 45],
							  ["Chains", 1550, 10880, 74],
							  ["Mirrors", 275, 6004, 8],
							  ["Spokes", 765, 6543, 23]];

				// Queue a command to write the sample data to the worksheet
				sheet.getRange("A2:D8").values = values;

				// Queue a command to format the header row
				sheet.getRange("A2:D2").format.font.bold = true;

				// Run the queued-up commands, and return a promise to indicate task completion
				return ctx.sync();
			})
			.catch(function (error) {
				// Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
				app.showNotification("Error: " + error);
				console.log("Error: " + error);
				if (error instanceof OfficeExtension.Error) {
					console.log("Debug info: " + JSON.stringify(error.debugInfo));
				}
			});
		}

		function highlightRow(rowToHighlight) {
			switch ($("#how-to-highlight").val()) {
				case "fill formatting":
					rowToHighlight.format.fill.color = "orange";
					break;
				case "bold text":
					rowToHighlight.format.font.bold = true;
					break;
				case "display in taskpane":
					$("#results").append("<p>" + $("#what-to-highlight").val() + " : " + rowToHighlight.values + "</p>");
					$("#results").show();
				default:
					rowToHighlight.format.fill.color = "orange";
					break;
			}

		}

		function hightlightHighestValue() {

			// Run a batch operation against the Excel object model
			Excel.run(function (ctx) {

				// Create a proxy object for the selected range and load its address and values properties
				var sourceRange = ctx.workbook.getSelectedRange().load("values, address");

				// Run the queued-up command, and return a promise to indicate task completion
				return ctx.sync()
					.then(function () {
						var largestRow = 0;
						var largestValue = 0;
						// Find the cell/row to highlight
						for (var i = 0; i < sourceRange.values.length; i++) {
							if (sourceRange.values[i][0] > largestValue) {
								largestRow = i;
								largestValue = sourceRange.values[i][0];
							}
						}

						// Highlight the row
						var largestCell = sourceRange.getCell(largestRow, 0);
						rowToHighlight = largestCell.getEntireRow().getIntersection(sourceRange.worksheet.getUsedRange());
						sourceRange.worksheet.getUsedRange().format.fill.clear();
						sourceRange.worksheet.getUsedRange().format.font.bold = false;
						$("#results").empty();
						if ($("#how-to-highlight").val() == "display in taskpane") {
							rowToHighlight.load("values");
						}

					})
					 // Run the queued-up commands
					.then(ctx.sync)
					.then(function () {
						highlightRow(rowToHighlight);
					})
					.then(ctx.sync)
			})
			.catch(function (error) {
				// Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
				app.showNotification("Error: " + error);
				console.log("Error: " + error);
				if (error instanceof OfficeExtension.Error) {
					console.log("Debug info: " + JSON.stringify(error.debugInfo));
				}
			});
		}

		function hightlightLowestValue() {

			// Run a batch operation against the Excel object model
			Excel.run(function (ctx) {

				// Create a proxy object for the selected range and load its address and values properties
				var sourceRange = ctx.workbook.getSelectedRange().load("values, address");

				// Run the queued-up command, and return a promise to indicate task completion
				return ctx.sync()
					.then(function () {
						var lowestRow = sourceRange.getRow(0);
						var lowestValue = sourceRange.values[0][0];
						// Find the cell/row to highlight
						for (var i = 0; i < sourceRange.values.length; i++) {
							if (sourceRange.values[i][0] < lowestValue) {
								lowestRow = i;
								lowestValue = sourceRange.values[i][0];
							}
						}

						// Highlight the row
						var lowestCell = sourceRange.getCell(lowestRow, 0);
						rowToHighlight = lowestCell.getEntireRow().getIntersection(sourceRange.worksheet.getUsedRange());
						sourceRange.worksheet.getUsedRange().format.fill.clear();
						sourceRange.worksheet.getUsedRange().format.font.bold = false;
						$("#results").empty();
						if ($("#how-to-highlight").val() == "display in taskpane") {
							rowToHighlight.load("values");
						}

					})
					   // Run the queued-up commands
					.then(ctx.sync)
					.then(function () {
						highlightRow(rowToHighlight);
					})
					.then(ctx.sync)
			})
			.catch(function (error) {
				// Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
				app.showNotification("Error: " + error);
				console.log("Error: " + error);
				if (error instanceof OfficeExtension.Error) {
					console.log("Debug info: " + JSON.stringify(error.debugInfo));
				}
			});
		}


		function hightlightFirstItem() {

			// Run a batch operation against the Excel object model
			Excel.run(function (ctx) {

				// Create a proxy object for the selected range and load its address and values properties
				var sourceRange = ctx.workbook.getSelectedRange().load("values, address");

				// Run the queued-up command, and return a promise to indicate task completion
				return ctx.sync()
					.then(function () {

						// Find and highlight the row
						var firstCell = sourceRange.getCell(0, 0);
						rowToHighlight = firstCell.getEntireRow().getIntersection(sourceRange.worksheet.getUsedRange());
						sourceRange.worksheet.getUsedRange().format.fill.clear();
						sourceRange.worksheet.getUsedRange().format.font.bold = false;
						$("#results").empty();
						if ($("#how-to-highlight").val() == "display in taskpane") {
							rowToHighlight.load("values");
						}

					})
					 // Run the queued-up commands
					.then(ctx.sync)
					.then(function () {
						highlightRow(rowToHighlight);
					})
					.then(ctx.sync)
			})
			.catch(function (error) {
				// Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
				app.showNotification("Error: " + error);
				console.log("Error: " + error);
				if (error instanceof OfficeExtension.Error) {
					console.log("Debug info: " + JSON.stringify(error.debugInfo));
				}
			});
		}

		function hightlightLastItem() {

			// Run a batch operation against the Excel object model
			Excel.run(function (ctx) {

				// Create a proxy object for the selected range and load its address and values properties
				var sourceRange = ctx.workbook.getSelectedRange().load("values, address");

				// Run the queued-up command, and return a promise to indicate task completion
				return ctx.sync()
					.then(function () {

						// Find and highlight the row
						var lastCell = sourceRange.getLastCell();
						rowToHighlight = lastCell.getEntireRow().getIntersection(sourceRange.worksheet.getUsedRange());
						sourceRange.worksheet.getUsedRange().format.fill.clear();
						sourceRange.worksheet.getUsedRange().format.font.bold = false;
						$("#results").empty();
						if ($("#how-to-highlight").val() == "display in taskpane") {
							rowToHighlight.load("values");
						}

					})
					// Run the queued-up commands
					.then(ctx.sync)
					.then(function () {
						highlightRow(rowToHighlight);
					})
					.then(ctx.sync)
			})
			.catch(function (error) {
				// Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
				app.showNotification("Error: " + error);
				console.log("Error: " + error);
				if (error instanceof OfficeExtension.Error) {
					console.log("Debug info: " + JSON.stringify(error.debugInfo));
				}
			});
		}

		function hightlightDuplicateItems() {

			// Run a batch operation against the Excel object model
			Excel.run(function (ctx) {

				// Create a proxy object for the selected range and load its address and values properties
				var sourceRange = ctx.workbook.getSelectedRange().load("values, address");

				// Run the queued-up command, and return a promise to indicate task completion
				return ctx.sync()
					.then(function () {

						// Find duplicates
						var len = sourceRange.values.length;
						var counts = {};

						// Clear existing formatting
						sourceRange.worksheet.getUsedRange().format.fill.clear();
						sourceRange.worksheet.getUsedRange().format.font.bold = false;
						$("#results").empty();


						for (var i = 0; i < len; i++) {
							var item = sourceRange.values[i][0];
							counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
						}

						for (var item in counts) {
							if (counts[item] > 1) {
								rowsArray = [];
								// Highlight the duplicate rows
								for (var j = 0; j < len; j++) {
									if (sourceRange.values[j][0] == item) {
										rowToHighlight = sourceRange.getRow(j).getEntireRow().getIntersection(sourceRange.worksheet.getUsedRange());
										rowsArray.push(rowToHighlight);
										if ($("#how-to-highlight").val() == "display in taskpane") {
											rowToHighlight.load("values");
										}
									}
								}
							}
						}
					})
					 // Run the queued-up commands
					.then(ctx.sync)
					.then(function () {
						$.each(rowsArray, function (i, val) {
							highlightRow(rowsArray[i]);
						});
					})
					.then(ctx.sync)
			})
			.catch(function (error) {
				// Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
				app.showNotification("Error: " + error);
				console.log("Error: " + error);
				if (error instanceof OfficeExtension.Error) {
					console.log("Debug info: " + JSON.stringify(error.debugInfo));
				}
			});
		}
	};

})();

/*
Excel-Add-in-JS-RangeHighlighter, https://github.com/OfficeDev/Excel-Add-in-JS-RangeHighlighter

Copyright (c) Microsoft Corporation

All rights reserved. 

MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the 
following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT 
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN 
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE 
USE OR OTHER DEALINGS IN THE SOFTWARE. 
*/