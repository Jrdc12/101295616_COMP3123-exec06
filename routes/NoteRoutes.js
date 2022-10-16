const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel');


//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', async (req, res) => {
    // Validate request
    if(!req.body.noteTitle) {
        return res.status(400).send({
            message: "Note title can not be empty"
        });
    }

    if(!req.body.noteDescription) {
        return res.status(400).send({
            message: "Note description can not be empty"
        });
    }

    if(!req.body.priority) {
        return res.status(400).send({
            message: "Note priority can not be empty"
        });
    }

    //TODO - Write your code here to save the note
    // Create a Note
    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateAdded: req.body.dateAdded,
        dateUpdated: req.body.dateUpdated,
    })

    // Save Note in the database
    try {
        const data = await note.save()
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', async (req, res) => {
    //TODO - Write your code here to returns all note
    try {
        const notes = await Note.find()
        res.send(notes)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        })
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to return onlt one note using 
    try {
        const note = await Note.findById(req.params.noteId)
        if (!note) {
            res.status(404).send("Note not found with id " + req.params.noteId)
        }
        res.send(note)
    } catch (err) {
        res.status(500).send("Error retrieving note with id " + req.params.noteId)
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to update the note using noteid
    try {
        const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {new: true})
        if (!note) {
            res.status(404).send("Note not found with id " + req.params.noteId)
        }
        res.send(note)
    } catch (err) {
        res.status(500).send("Error updating note with id " + req.params.noteId)
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    try {
        const note = await Note.findByIdAndRemove(req.params.noteId)
        if (!note) {
            res.status(404).send("Note not found with id " + req.params.noteId)
        }
        res.send({message: "Note deleted successfully!"})
    } catch (err) {
        res.status(500).send("Error deleting note with id " + req.params.noteId)
    }
});

module.exports = router;
