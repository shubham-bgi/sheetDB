function checkKeys(obj, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) return arr[i];
  }
}

function getUrl(config) {
  switch (config.dbEngine) {
    case "mysql":
      return "jdbc:google:mysql://" + config.connectionName;
    case "postgresql":
      return "jdbc:google:postgresql://" + config.connectionName;
    case "sqlserver":
      return "jdbc:google:sqlserver://" + config.connectionName;
  }
}

function errObj(message) {
  return { message };
}
