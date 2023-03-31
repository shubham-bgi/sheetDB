function addConnection(config) {
  config.url = 'jdbc:google:mysql://' + config['connection-name'];
  try {
    const conn = connectgoogleSQL(config.url, config.username, config.password);
    storeConfig(config);
  } catch (err) {
    console.log('Failed with an error %s', err.message);
  }
}

function getConnection(nickname) {
  const config = getConfig(nickname);
  try {
    console.log(config.url);
    const conn = connectgoogleSQL(config.url, config.username, config.password);
    return conn;
  } catch (err) {
    console.log('Failed with an error %s', err.message);
  }
}

function connectSQL(url, username, password) {
  return Jdbc.getConnection(url, username, password);
}

function connectgoogleSQL(url, username, password) {
  console.log(url, username, password);
  return Jdbc.getCloudSqlConnection(url, username, password);
}