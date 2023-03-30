function setData(results) {
    let outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    setHeaders(outputSheet, results);
    setRows(outputSheet, results);
}

function setHeaders(sheet, results) {
  const numCols = results.getMetaData().getColumnCount();
  const metaData = results.getMetaData();
  let headers = [];
  for (var i = 1; i <= numCols; i++) {
    headers.push(metaData.getColumnName(i));
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
}

function setRows(sheet, results) {
  const numCols = results.getMetaData().getColumnCount();
  let rows = [];
  while (results.next()) {
    let row = [];
    for (let col = 1; col <= numCols; col++) {
      row.push(results.getString(col));
    }
    rows.push(row);
  }
  sheet.getRange(2, 1, rows.length, numCols).setValues(rows)
}