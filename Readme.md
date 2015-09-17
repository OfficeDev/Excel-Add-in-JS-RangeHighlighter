# Range Highlighter Task Pane Add-in Sample for Excel 2016

_Applies to: Excel 2016_ 

This simple task pane add-in shows how to do common operations using the Range API in Excel 2016. It comes in two flavors: text editor and Visual Studio. The figures below show what operations are supported and the result in the spreadsheet.
![Range Highlighter Sample](/images/RangeHighlighter_taskpane.png)
![Range Highlighter Sample](/images/RangeHighlighter_what.png)
![Range Highlighter Sample](/images/RangeHighlighter_how.png)
![Range Highlighter Sample](/images/RangeHighlighter_result.png)

## Try it out
### Text editor version
1.	The simplest way to deploy and test this add-in is to copy the files to a network share. To do this, follow these steps:
	1. Create a folder on a network share (for example, \\MyShare\RangeHighlighter) and copy all the files in the Text editor folder. 
	2. Edit the <SourceLocation> element of the manifest file so that it points to the share location for the .html page from step 1. 
	3. Then copy the manifest (RangeHighlighterManifest.xml) to a network share (for example, \\MyShare\MyManifests).
	4. Then add the share location that contains the manifest as a trusted app catalog in Excel. To do this, follow these steps:
	    1. 	Launch Excel.
	    2. Choose the File tab, and then choose Options.
	    3. Choose Trust Center, and then choose the Trust Center Settings button.
	    4. 	Choose Trusted App Catalogs.
	    5. 	In the Catalog Url box, enter the path to the network share you created in Step 1, and then choose Add Catalog.
	    6. Select the Show in Menu check box, and then choose OK.
	    7. 	A message is displayed to inform you that your settings will be applied the next time you start Office. Close and restart Excel. 
        
2.	Test and run the add-in. To do this, follow these steps:
    1.  On the Insert tab in Excel 2016, choose My Add-ins. 
    2.  In the Office Add-ins dialog box, choose Shared Folder.
    3.  Choose Range Highlighter Sample, and then choose Insert.
    4.  The add-in will open in a task pane to the right of the current worksheet as shown in this diagram. ![Range Highlighter Sample](/images/RangeHighlighter_taskpane.png)
    5. The add-in populates a range with some sample data. Now select a column of cells such as B3:B8 in the active sheet and make your selections in the two dropdown lists in the task pane. Then click Go!. You should see the result. For example, figure 2 shows two rows with duplicate values in the selected range highlighted with orange. Now free feel to explore the other combinations in the task pane and see the appropriate result in the spreadsheet or in the Results section in the task pane.![Range Highlighter Sample](/images/RangeHighlighter_result.png)

### Visual Studio version
1.  Copy the project to a local folder. Then open the Excel-Add-in-JS-RangeHighlighter.sln in Visual Studio.
2. Press F5 to build and deploy the sample add-in. This will launch Excel 2016 with the add-in loaded in the task pane as shown in this diagram. ![Range Highlighter Sample](/images/RangeHighlighter_taskpane.png)
3. The add-in populates a range with some sample data. Now select a column of cells such as B3:B8 in the active sheet and make your selections in the two dropdown lists in the task pane. Then click Go!. You should see the result. For example, figure 2 shows two rows with duplicate values in the selected range highlighted with orange. Now free feel to explore the other combinations in the task pane and see the appropriate result in the spreadsheet or in the Results section in the task pane.![Range Highlighter Sample](/images/RangeHighlighter_result.png)



### Learn more

This is just a sample of what can be accomplished with the new Excel JavaScript APIs. The APIs have much more to offer. If you’d like to know more, you’re welcome to explore any of the available resources. 

Here are just a few:

1.  [Excel programming guide](excel-add-ins-programming-guide.md)
2.  [Add-in code samples](excel-add-ins-code-samples.md) 
3.  [Reference](excel-add-ins-javascript-reference.md)
