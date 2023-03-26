import { storeConfig } from "./store.gs";
function connect(config, store: boolean = true) {
    config.url = 'jdbc:google:mysql://' + config['connection-name'];
    try {
        const conn = connectgoogleSQL(config.url, config.username, config.password);
        if(store) storeConfig(config);
    } catch(err) {
        throw err
    }
}

function connectSQL(url, username, password) {
    return Jdbc.getConnection(url, username, password);
  }
  
  function connectgoogleSQL(url, username, password) {
    return Jdbc.getCloudSqlConnection(url, username, password);
  }