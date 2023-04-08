const savedProperties = {
  connections: "connections"
};

function storeAddConnection(config) {
  let obj = {};
  obj[config.nickname] = config;
  let userProperties = PropertiesService.getUserProperties();
  let connections = userProperties.getProperty(savedProperties.connections);
  if (!connections) {
    userProperties.setProperty(
      savedProperties.connections,
      JSON.stringify(obj)
    );
    return;
  }
  connections = JSON.parse(connections);
  connections = { ...connections, ...obj };
  userProperties.setProperty(
    savedProperties.connections,
    JSON.stringify(connections)
  );
}

function storeGetConnection(nickname) {
  let userProperties = PropertiesService.getUserProperties();
  let connections = userProperties.getProperty(savedProperties.connections);
  connections = JSON.parse(connections);
  if (nickname) return connections[nickname];
  return connections;
}

function getNickNames() {
  const configs = storeGetConnection();
  return Object.keys(configs);
}