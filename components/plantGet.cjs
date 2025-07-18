const mysql = require("mysql2/promise");
const fs = require("fs");
//Read DB config from JSON
const config = fs.readFileSync("config.json", "utf-8");
const configj = JSON.parse(config);

function plantPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return mysql.createConnection(configj).then((connection) => {
        return connection
          .query("SELECT name FROM mas_sites WHERE id = ?", [id])
          .then((row) => {
            connection.end();
            resolve(row);
          })
          .catch((error) => {
            connection.end();
            reject(error);
          });
      });
    }, 2000);
  });
}

module.exports = plantPromise;
