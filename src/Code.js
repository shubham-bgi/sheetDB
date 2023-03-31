function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  const ui = SpreadsheetApp.getUi()
    .createMenu("Sheet DB")
    .addItem("Add Connection", "getAddConnection");
  const configs = getConfig();
  if (configs && Object.keys(configs).length !== 0) {
    ui.addItem("Edit Connection", `getEditConnection`)
      .addItem("Delete Connection", `getDeleteConnection`)
      .addItem("Run Query", `getRunQuery`);
  }
  ui.addToUi();
}
