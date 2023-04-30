function runQuery(form) {
  try {
    const totalStart = new Date();
    const { nickname, query, password, outputChoice } = form;
    console.log(form);
    if (!query) throw errObj("Oops! Something went wrong. Could you please try entering a valid query?");
    if (!query.toLowerCase().startsWith("select")) throw errObj("For now, we can only handle select queries.");
    const conn = getConnection(nickname, password);
    if (!conn)
      throw errObj("Connection Failed! Please check connection details.");
    const start = new Date();

    const stmt = conn.createStatement();
    stmt.setMaxRows(100);
    const results = stmt.executeQuery(query);

    if(!results) throw errObj("No result");
    if(!results.getMetaData().getColumnCount()) throw errObj("No data received. Use select statements.");

    let outputSheet;
    switch (outputChoice) {
      case "current":
        outputSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        outputSheet.getDataRange().clearContent();
        break;
      case "new":
        outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        break;
    }
    setHeaders(outputSheet, results);
    setRows(outputSheet, results);

    results.close();
    stmt.close();

    const end = new Date();
    const totalEnd = new Date();

    const timeTook = end - start;
    const totalTimeTook = totalEnd - totalStart;
    console.log("Time elapsed: ms", timeTook);
    console.log("Tottal Time elapsed: ms", totalTimeTook);
    return (
      "Time took by query: " +
      timeTook +
      " ms\n" +
      "Total time took: " +
      totalTimeTook +
      " ms"
    );
  } catch (err) {
    console.log(err);
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
