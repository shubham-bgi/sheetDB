function addConnection(config) {
  config.url = getUrl(config);
  const key = checkKeys(config, ['connectionName', 'username', 'nickname']);
  if(key) return key;
  // storeAddConnection(config);
  console.log(config);
  onOpen();
}
function testConnection(config) {
  config.url = getUrl(config);
  const key = checkKeys(config, ['connectionName', 'username', 'password']);
  if(key) return key;
  try {
    const conn = Jdbc.getCloudSqlConnection(
      config.url,
      config.username,
      config.password
    );
    return true;
  } catch (err) {
    console.log("Failed with an error %s", err.message);
    return false;
  }
}
function getUrl(config) {
  return "jdbc:google:mysql://" + config.connectionName;
}
function getConnection(nickname) {
  const config = storeGetConnection(nickname);
  try {
    const conn = Jdbc.getCloudSqlConnection(
      config.url,
      config.username,
      config.password
    );
    return conn;
  } catch (err) {
    console.log("Failed with an error %s", err.message);
  }
}

function deleteConnection(nickname) {
console.log(nickname);
}