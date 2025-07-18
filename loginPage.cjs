const express = require("express");
const { createConnection } = require("mysql2/promise");
const cors = require("cors");
const app = express(); // create an express server object and save it as apps
app.use(express.json()); //Express to automatically parse incoming requests with JSON payloads
// app.use(cors({
//   origin: "https://loginbackend-2uec.onrender.com",
//   methods: ["GET", "POST"],
//   credentials: true
// }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const config = {
  host: "35.244.19.98",
  user: "hubber",
  password: "VenaHub@18",
  database: "mhub",
};

app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.post("/loginpage", (req, res) => {
  const { email, password } = req.body;

  setTimeout(() => {
    createConnection(config)
      .then((connection) => {
        return connection
          .query("SELECT * FROM users WHERE email = ?", [email])
          .then(([rows]) => {
            connection.end();
            return rows;
          });
      })
      .then((results) => {
        if (results.length === 0) {
          return res.status(401).json({ error: "User not found" });
        }

        const user = results[0];
        if (user.password !== password) {
          return res.status(401).json({ error: "Incorrect password" });
        }

        res.json({ message: "Login successful", user });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      });
  }, 2000);
});

app.get("/plantid", (req, res) => {
  const id = req.query.id;
   setTimeout(() => {
    createConnection(config)
      .then((connection) => {
        return connection
          .query("SELECT name FROM mas_sites WHERE id = ?", [id])
          .then(([rows]) => {
            connection.end();
            return rows;
          });
      })
      .then((results) => {
        if (results.length === 0) {
          return res.status(404).send("Plant not found");
        }

        res.json(results[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("error");
      });
  }, 2000);

});

app.listen(4000);
