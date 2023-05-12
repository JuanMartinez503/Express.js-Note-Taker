const notes = require("express").Router();
const { error } = require("console");
const fs = require("fs");
const uuid = require('uuid')

notes.get("/", (req, res) => {
  console.log(req.method);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});
notes.post("/", (req, res) => {
  console.log(req.method);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
        title ,
        text,
        id: uuid.v4()
    }
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote)
      
      fs.writeFile('./db/db.json', JSON.stringify(parsedData), writeErr=>{
        if(writeErr) {
            console.error(writeErr)
        } else{
            console.log (`Note was added with an id of${newNote.id}`)
        }
      })
      }
    });
    const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting new note');
  }
});

module.exports = notes;
