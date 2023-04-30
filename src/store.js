const savedProperties = {
  connections: "connections",
};
const userProperties = PropertiesService.getUserProperties();

function storeAddConnection(config) {
  let obj = {};
  obj[config.nickname] = config;
  let connections =
    userProperties.getProperty(savedProperties.connections) || "{}";
  connections = JSON.parse(connections);
  connections = { ...connections, ...obj };
  userProperties.setProperty(
    savedProperties.connections,
    JSON.stringify(connections)
  );
}

function storeGetConnection(nickname) {
  let connections = userProperties.getProperty(savedProperties.connections);
  connections = JSON.parse(connections);
  if (nickname) return connections[nickname];
  return connections;
}

function storeGetNicknames() {
  const configs = storeGetConnection();
  return Object.keys(configs);
}

function storeDeleteConnection(nickname) {
  let connections = storeGetConnection();
  delete connections[nickname];
  console.log('Configs Remaining: ', JSON.stringify(connections));
  userProperties.setProperty(
    savedProperties.connections,
    JSON.stringify(connections)
  );
}

//to test
function TEST_DELETE_ALL() {
  userProperties.deleteAllProperties();
}
function TEST_ALL_PROP() {
  const properties = userProperties.getProperties();
  console.log(properties);
}
function TEST_DELETE_ONE() {
  userProperties.deleteProperty("active_gcsql");
}
