const express = require("express");
const path = require("path");
const app = express();

const logger = require("morgan");

// Allow static file use in /pages directory
app.use(express.static("pages"));
app.use(logger("dev"))


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"))
});

app.get("about", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"))
});

app.get("contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contact-me.html"))
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "404.html"))
});

app.listen(3000, function () {
  console.log(`App listening on port 3000!`);
});