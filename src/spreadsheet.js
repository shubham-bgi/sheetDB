function runQuery(form) {
  try {
    const { nickname, query } = form;
    const conn = getConnection(nickname);
    if (!conn) return "Connection Failed! Please check connection details.";
    const start = new Date();

    const stmt = conn.createStatement();
    stmt.setMaxRows(100);
    const results = stmt.executeQuery(query);

    let outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    setHeaders(outputSheet, results);
    setRows(outputSheet, results);

    results.close();
    stmt.close();

    const end = new Date();

    const timeTook = end - start;
    console.log("Time elapsed: ms", timeTook);
    return "Time took : " + timeTook + " ms";
  } catch (err) {
    console.log("Failed with an error %s", err.message);
    return err.message;
  }
}

function setData(results) {
  let outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
  setHeaders(outputSheet, results);
  setRows(outputSheet, results);
}

function setHeaders(sheet, results) {
  const numCols = results.getMetaData().getColumnCount();
  const metaData = results.getMetaData();
  let headers = [];
  for (let i = 1; i <= numCols; i++) {
    headers.push(metaData.getColumnName(i));
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
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
  sheet.getRange(2, 1, rows.length, numCols).setValues(rows);
}
