function addConnection(config) {
  console.log(config);
  return;
  config.url = "jdbc:google:mysql://" + config["connection-name"];
  try {
    const conn = connectgoogleSQL(config.url, config.username, config.password);
    storeAddConnection(config);
  } catch (err) {
    console.log("Failed with an error %s", err.message);
  }
}

function getConnection(nickname) {
  const config = storeGetConnection(nickname);
  try {
    const conn = connectgoogleSQL(config.url, config.username, config.password);
    return conn;
  } catch (err) {
    console.log("Failed with an error %s", err.message);
  }
}

function connectSQL(url, username, password) {
  return Jdbc.getConnection(url, username, password);
}

function connectgoogleSQL(url, username, password) {
  return Jdbc.getCloudSqlConnection(url, username, password);
}
