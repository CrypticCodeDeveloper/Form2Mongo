// MongoDB

// username: admin
// password: ezekiel447

const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3500;

mongoose.connect(
  "mongodb+srv://admin:ezekiel447@form.kqtoig7.mongodb.net/?retryWrites=true&w=majority&appName=Form"
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error connecting to Database");
});

db.once("connection", () => {
  console.log("Connected to database successfully");
});

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/thank-you(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thank-you.html"));
});

app.post("/thank-you.html", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const data = {
    username: username,
    password: password,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("User data recorded successfully");
  });

  console.log("Request Body: ", req.body);

  res.redirect("/thank-you.html");
});

app.once("connection", () => {
  console.log("Connection established to the server");
});

app.listen(PORT, () => {
  console.log("server is currently running on localhost:" + PORT);
});
