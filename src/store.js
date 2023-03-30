function storeConfig(config) {
  let userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(config.nickname, JSON.stringify(config));
}

function getConfig(nickname) {
  let userProperties = PropertiesService.getUserProperties();
  if(nickname) {
    return userProperties.getProperty(nickname);
  }
  return userProperties.getProperties();
}

function getConfig(nickname) {
  let userProperties = PropertiesService.getUserProperties();
  if(nickname) {
    return userProperties.getProperty(nickname);
  }
  return userProperties.getProperties();
}
