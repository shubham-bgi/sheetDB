function getAddConnection() {
  let html = HtmlService.createHtmlOutputFromFile("html/addConnection")
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, "Enter Connection Details");
}

function getEditConnection() {
  let html = HtmlService.createHtmlOutputFromFile("html/editConnection")
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, "Edit Connection Details");
}

function getDeleteConnection() {
  let template = HtmlService.createTemplateFromFile("html/deleteConnection");
  template.nickname = nickname;
  let html = template.evaluate().getContent();
  SpreadsheetApp.getUi().showModalDialog(html, "Delete Connection");
}

function getRunQuery() {
  // let html = HtmlService.createHtmlOutputFromFile("html/runQuery");
  let htmlTemplate = HtmlService.createTemplateFromFile("html/runQuery");
  const configs = storeGetConnection();
  const nickname = Object.keys(configs);
  htmlTemplate.data = nickname;
  var html = htmlTemplate
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle("sample");
  SpreadsheetApp.getUi().showSidebar(html);
}
