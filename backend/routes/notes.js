const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1: GET all notes using GET "/api/auth/fetchallnotes"   login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2: add notes using GET "/api/auth/addnote"   login require
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 5 chars long').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 chars long').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        // if there is error,return bad request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})


// ROUTE 3: update notes GET "/api/auth/updatenote"   login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find a note to update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(401).send("Not found") }

        // check autherization
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not found")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 4: delete notes delete "/api/auth/deletenote"   login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // find a note to delete
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(401).send("Not found") }

        // check autherization
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not found")
        }
        note = await Note.findByIdAndDelete(req.params.id, { $set: newNote }, { new: true })
        res.json({ "Success": "Note has been deleted." })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
module.exports = router
