function addConnection(config) {
  config.url = getUrl(config);
  console.log(config);
  const keysToCheck = config.savePassword
    ? ["connectionName", "username", "nickname", "password"]
    : ["connectionName", "username", "nickname"];
  const key = checkKeys(config, keysToCheck);
  if (key) return key;
  storeAddConnection(config);
  console.log(config);
  onOpen();
}
function testConnection(config) {
  config.url = getUrl(config);
  console.log(config);
  const key = checkKeys(config, ["connectionName", "username", "password"]);
  if (key) return key;
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

function getConnection(nickname) {
  const config = storeGetConnection(nickname);
  try {
    return Jdbc.getCloudSqlConnection(
      config.url,
      config.username,
      config.password
    );
  } catch (err) {
    console.log("Failed with an error %s", err.message);
    return false;
  }
}

function deleteConnection(nickname) {
  console.log(nickname);
  storeDeleteConnection(nickname);
  onOpen();
}
