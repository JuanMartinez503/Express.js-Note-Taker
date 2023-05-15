const express = require("express");
const path = require("path");
const app = express();
const api = require("./routes/index.js");
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api); // this will use the index file that is referred to as the api const
app.use(express.static("public"));
//this sets the public table to be used by default

app.get("/notes", (req, res) => {
    //this will route the to the notes.html file 
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.use("*", (req, res) => {
    //This is a wild card link and it will re-route random links to it
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(PORT, () => {
  console.log("app is listening");
});
