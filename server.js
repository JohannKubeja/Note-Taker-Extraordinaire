const fs = require("fs");
const{writeFile, readFile} = fs.promises;
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');

const app = express();
// making public folder available to requests for clients
app.use(express.static("public"));

// add body parsing middleware

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET * should return the index.html file.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
// GET /notes should return the notes.html file.

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})


// GET /api/notes should read the db.json file and return all saved notes as JSON.

app.get("/api/notes", (req, res) => {
    readFile("db/db.json").then(data => {
        res.send(data);
    })
})

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post("/api/notes", (req, res) => {
    readFile("db/db.json").then(data => {
        const newNote = req.body
        newNote.id = uuidv4();
        const db = JSON.parse(data)
        db.push(newNote)
        return writeFile("db/db.json", JSON.stringify(db))
        
    }).then(data => {
        res.json(data)
    })
})


app.listen(PORT, () => {
    console.log("server listening on PORT 3001");
} )