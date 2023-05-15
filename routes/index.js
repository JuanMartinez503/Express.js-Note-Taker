const notesRouter = require("./notes.js");
const express = require("express");
const app = express();

app.use("/notes", notesRouter);

module.exports = app;
//exports the app const