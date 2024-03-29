// dependencies
const connection = require("./connection.js");
const mysql = require("mysql");
const express = require("express");
const path = require("path");

// sets up the express app
const app = express();
let PORT = process.env.PORT || 8000;

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public a static folder
app.use(express.static("public"));

app.get("/api/notes", function(req, res) {
  connection.query("SELECT * FROM notes", function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.post("/api/task", function(req, res) {
  let newNote = req.body;
  connection.query(
    "INSERT INTO notes (title,body) values (?,?)",
    [newNote.title, newNote.note],
    function(err, data) {
        if (err) throw err;
        console.log("new note added!");
    }
  );
});

app.delete("/api/notes/:id", function(req,res){
    let id = req.params.id;
    

    connection.query(
        "DELETE FROM notes WHERE id = ?", [id],
        function(err,data){
            if (err) throw err;
            console.log("note deleted");
        }
        
    );
});

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "notes.html"))
});


app.listen(PORT, function() {
  console.log("App listening on PORT http://localhost:" + PORT);
});
