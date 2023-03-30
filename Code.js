function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  const ui = SpreadsheetApp.getUi()
    .createMenu('Sheet DB')
    .addItem('Add Connection', 'getUserInputAddConnection');
    const configs = getConfig();
    if(configs && Object.keys(configs).length !== 0) {
      ui
      .addItem('Edit Connection', `run()`)
      .addItem('Delete Connection', `getUserInputDeleteConnection()`)
      .addItem('Run', `run()`);
    }
    ui.addToUi();
}

function getUserInputAddConnection() {
  var html = HtmlService.createHtmlOutputFromFile('addConnection.html').setWidth(400).setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Enter Connection Details');
}

function getUserInputEditConnection() {
  var html = HtmlService.createHtmlOutputFromFile('editConnection.html').setWidth(400).setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Edit Connection Details');
}
function getUserInputDeleteConnection(nickname) {
  var template = HtmlService.createTemplateFromFile('deleteConnection.html');
  template.nickname = nickname;
  let html = template.evaluate().getContent();
  SpreadsheetApp.getUi().showModalDialog(html, 'Delete Connection');
}

function addDropDown() { 
  
}
function run(nickname) {
  try {
    console.log(nickname);
    return;
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

