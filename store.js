function storeConfig(config) {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(config.nickname, JSON.stringify(config));
}

function getAllConfig() {
  var userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperties();
}