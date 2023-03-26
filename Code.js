import { connect } from "./connection";
import {  } from "./store";
function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Sheet DB')
    .addItem('Add Connection', 'getUserInput')
    .addSeparator()
    // .addSubMenu(SpreadsheetApp.getUi().createMenu('My sub-menu')
    //   .addItem('One sub-menu item', 'mySecondFunction')
    //   .addItem('Another sub-menu item', 'myThirdFunction'))
    .addToUi();
}

function getUserInput() {
  var html = HtmlService.createHtmlOutput(
    '<form>' +
    '<label for="nickname">Nickname:</label>' +
    '<input type="text" name="nickname" id="nickname"><br>' +
    '<label for="connection-name">Google connection Name:</label>' +
    '<input type="text" name="connection-name" id="connection-name"><br>' +
    '<label for="username">Username:</label>' +
    '<input type="text" name="username" id="username"><br>' +
    '<label for="password">Password:</label>' +
    '<input type="password" name="password" id="password"><br>' +
    '<input type="button" value="Run" onclick="submitForm()">' +
    '</form>' +
    '<script>' +
    'function submitForm() {' +
    'google.script.run.withSuccessHandler(closeDialog).run(document.forms[0]);' +
    '}' +
    'function closeDialog() {' +
    'google.script.host.close();' +
    '}' +
    '</script>'
  ).setWidth(400).setHeight(300);

  SpreadsheetApp.getUi().showModalDialog(html, 'Enter Connection Details');
}


function run(config) {
  try {
    const start = new Date();

    var url = 'jdbc:google:mysql://' + config['connection-name'];
    var username = config.username;
    var password = config.password;
    var query = config.query;
    console.log(query);
    // const query = "SELECT * FROM noice_catalog.catalog where created_at > '2022-10-10';";
    // const url = 'jdbc:google:mysql://sheetdb-381717:asia-south2:root';
    // const username = 'root';
    // const password = 'root';
    const conn = connectgoogleSQL(url, username, password);

    const stmt = conn.createStatement();
    stmt.setMaxRows(10);
    const results = stmt.executeQuery(query);

    let outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    setHeaders(outputSheet, results);
    setRows(outputSheet, results);

    results.close();
    stmt.close();

    const end = new Date();

    console.log('Time elapsed: %sms', end - start);
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
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

