function getAddConnection() {
  let html = HtmlService.createHtmlOutputFromFile("html/addConnection")
    .setWidth(600)
    .setHeight(280);
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
  template.nicknames = getNickNames();
  let html = template.evaluate().getContent();
  SpreadsheetApp.getUi().showModalDialog(html, "Delete Connection");
}

function getRunQuery() {
  let htmlTemplate = HtmlService.createTemplateFromFile("html/runQuery");
  htmlTemplate.nicknames = getNickNames();
  var html = htmlTemplate
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle("Run Query");
  SpreadsheetApp.getUi().showSidebar(html);
}
