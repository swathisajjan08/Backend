const loginPromise = require("./components/loginPost.cjs");
const plantPromise = require("./components/plantGet.cjs");
const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");
const app = express(); // create an express server object and save it as apps

app.use(express.json()); //Express to automatically parse incoming requests with JSON payloads
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.post("/loginpage", (req, res) => {
  const { email, password } = req.body;
  loginPromise(email)
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
      return res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/plantid", (req, res) => {
  const id = req.query.id;
  plantPromise(id)
    .then((results) => {
      if (results.length === 0) {
        res.status(404).send("plant not found");
      } else {
        res.json(results[0]);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error");
    });
});

app.listen(4000);
