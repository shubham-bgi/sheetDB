function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  const ui = SpreadsheetApp.getUi()
    .createMenu('Sheet DB')
    .addItem('Add Connection', 'getAddConnection');
    const configs = getConfig();
    if(configs && Object.keys(configs).length !== 0) {
      ui
      .addItem('Edit Connection', `getEditConnection`)
      .addItem('Delete Connection', `getDeleteConnection`)
      .addItem('Run Query', `getRunQuery`);
    }
    ui.addToUi();
}

function getAddConnection() {
  var html = HtmlService.createHtmlOutputFromFile('html/addConnection').setWidth(600).setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Enter Connection Details');
}

function getEditConnection() {
  var html = HtmlService.createHtmlOutputFromFile('html/editConnection.html').setWidth(400).setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Edit Connection Details');
}
function getDeleteConnection() {
  var template = HtmlService.createTemplateFromFile('html/deleteConnection.html');
  template.nickname = nickname;
  let html = template.evaluate().getContent();
  SpreadsheetApp.getUi().showModalDialog(html, 'Delete Connection');
}

function getRunQuery() {
  SpreadsheetApp.getUi().showSidebar()
}
function run(nickname) {
  try {
    const conn = getConnection(nickname);

    const start = new Date();
    const stmt = conn.createStatement();
    stmt.setMaxRows(10);
    const results = stmt.executeQuery(query);

    results.close();
    stmt.close();

    const end = new Date();

    console.log('Time elapsed: %sms', end - start);
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
}

