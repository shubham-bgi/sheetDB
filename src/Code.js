function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  const ui = SpreadsheetApp.getUi()
    .createMenu("SQL sheet")
    .addItem("Add Connection", "getAddConnection");
  const configs = storeGetConnection();
  if (configs && Object.keys(configs).length !== 0) {
    //TODO: Add edit connection
    // ui.addItem("Edit Connection", `getEditConnection`)
    ui.addItem("Delete Connection", `getDeleteConnection`)
      .addSeparator()
      .addItem("Run Query", `getRunQuery`);
  }
  ui.addToUi();
}
