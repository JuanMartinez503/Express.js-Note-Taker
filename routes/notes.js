const notes = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");
//bring in the libraries i will use in the assignment

notes.get("/", (req, res) => {
  //I perform a get request to see the notes in the db document displayed in front end document
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
  //desconstruct the req.body to get the title and text from the front end
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid.v4(),//this function is used to assign a random id to the id document
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const parsedData = JSON.parse(data);
        //the data is parsed so I can push the newNote variable into the array
        parsedData.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(parsedData), (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
          } else {
            console.log(`Note was added with an id of${newNote.id}`);
          }
        });
      }
    });
    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
    //sends the status response so you can see it in the network tag
  } else {
    res.status(500).json("Error in posting new note");
  }
});

//this will delete selected notes 
notes.delete("/:id", (req, res) => {
  console.log(req.method);
  const noteId = req.params.id;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      //runs a filter method on parsed data and it will return the id's that do not match the selected id's 
      const filteredNotes = parsedData.filter((note) => note.id !== noteId);
      if (filteredNotes.length === parsedData.length) {
        res.status(404).json({ error: "Note not found" });
        //sends a 404 message if there are no notes to be deleted 
      } else {
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(filteredNotes),
          (writeErr) => {
            if (writeErr) {
              console.error(writeErr);
              res.status(500).json({ error: "Error writing to notes file" });
            } else {
              console.log(`Note with id ${noteId} was deleted`);
              res.status(200).json({ success: "Note deleted successfully" });
            }
          }
        );
      }
    }
  });
});

module.exports = notes;
