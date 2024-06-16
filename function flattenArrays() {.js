function flattenArrays() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Sheet1");
  var range = sheet.getDataRange();
  var values = range.getValues();
  
  // Get the headers
  var headers = values.shift();
  
  var colA = values.map(row => row[0]).filter(function(row) {
      return row  !== "";}); // Column A
  var colC = values.map(row => row[2]).filter(function(row) {
      return row  !== "";}); // Column C
  var colE = values.map(row => row[4]).filter(function(row) {
      return row  !== "";}); // Column E
  var colG = values.map(row => row[6]).filter(function(row) {
      return row  !== "";}); // Column G
  

  
  var result = colA.reduce((ac, a) => {
    var temp = colC.flatMap(c => colE.flatMap(e => colG.map(g => [a, c, e, g])));
    return ac.concat(temp);
  }, []);
  
  // Add the headers to the result
  result.unshift([headers[0], headers[2], headers[4], headers[6]]);
  
  // Get the "Dump" sheet or create it if it doesn't exist
  var dumpSheet = spreadsheet.getSheetByName("Dump") || spreadsheet.insertSheet("Dump");
  
  // Clear the "Dump" sheet
  dumpSheet.clear();
  
  // Write the result to the "Dump" sheet starting from the first column
  dumpSheet.getRange(1, 1, result.length, result[0].length).setValues(result);
}





