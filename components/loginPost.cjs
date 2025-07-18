const mysql = require("mysql2/promise");
const fs = require("fs");
//Read DB config from JSON
const config = fs.readFileSync("config.json", "utf-8");
const configj = JSON.parse(config);

function loginPromise(email) {
  return new Promise((resolve, reject) => {
    return mysql.createConnection(configj).then((connection) => {
      return connection
        .query("SELECT * FROM users WHERE email = ?", [email])
        .then(([rows]) => {
          connection.end();
          resolve(rows);
        })
        .catch((error) => {
          connection.end();
          reject(error);
        });
    });
  });
}

module.exports = loginPromise;
