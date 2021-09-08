const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Fetching all notes of  user using: get "api/notes/fetchallnotes" & require authentication
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
 } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

// Route 2: add notes of  user using: POST "api/notes/addnote" & require authentication
router.post('/addnote', fetchUser, [
    body('title', 'Title must be at least 3 chars long').isLength({ min: 3 }),
    body('description', 'Cannot be empty').isLength({ min: 5 }),
], async (req, res) => {

    try {
    const { title, description, tag } = req.body;
    // if there is error,  return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
        title, description, tag,
        user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)

} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error");
}
})

// Route 3: update a note of  user using: PuT "api/notes/updatenote" & require authentication
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const {title, description, tag} = req.body;

    // create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note});
});

// Route 4: delete a note of  user using: delete "api/notes/deletenote" & require authentication
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const {title, description, tag} = req.body;

    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted"});
});
module.exports = router
