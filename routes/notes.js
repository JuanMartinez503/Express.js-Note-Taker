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

notes.delete("/:id", (req, res) => {
  console.log(req.method);
  const noteId = req.params.id;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({error: 'Error reading notes file'});
    } else {
      const parsedData = JSON.parse(data);
      const filteredNotes = parsedData.filter((note) => note.id !== noteId);
      if (filteredNotes.length === parsedData.length) {
        res.status(404).json({error: 'Note not found'});
      } else {
        fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
            res.status(500).json({error: 'Error writing to notes file'});
          } else {
            console.log(`Note with id ${noteId} was deleted`);
            res.status(200).json({success: 'Note deleted successfully'});
          }
        });
      }
    }
  });
});

module.exports = notes;
