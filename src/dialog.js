function getAddConnection() {
  let html = HtmlService.createHtmlOutputFromFile("html/addConnection")
    .setWidth(600)
    .setHeight(250);
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
  template.nicknames = storeGetNicknames();
  const html = template.evaluate().getContent();
  const output = HtmlService.createHtmlOutput(html)
    .setWidth(250)
    .setHeight(150);
  SpreadsheetApp.getUi().showModalDialog(output, "Delete Connection");
}

function getRunQuery() {
  let htmlTemplate = HtmlService.createTemplateFromFile("html/runQuery");
  htmlTemplate.nicknames = storeGetNicknames();
  let html = htmlTemplate
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle("Run Query");
  SpreadsheetApp.getUi().showSidebar(html);
}
