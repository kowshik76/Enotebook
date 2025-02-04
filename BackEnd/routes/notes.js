const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// ✅ Fetch all notes (GET request) - Requires authentication
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Add a new note (POST request) - Requires authentication
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Notes({ title, description, tag, user: req.user.id });

        const savedNote = await note.save();
        res.status(201).json({ message: "Note added successfully!", savedNote });

    } catch (error) {
        console.error("Error adding note:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
// ✅ updating a  note (POST request) - Requires authentication
router.post('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // ✅ Creating a new note object for update
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // ✅ Find the existing note by ID
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // ✅ Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to update this note" });
        }

        // ✅ Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        // ✅ Send success response
        res.status(200).json({ message: "Note updated successfully", updatedNote: note });

    } catch (error) {
        console.error("Error updating note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Deleting a  note (DELETE request) - Requires authentication
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // ✅ Find the existing note by ID
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // ✅ Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to update this note" });
        }

        // ✅ Update the note
        note = await Notes.findByIdAndDelete(req.params.id);

        // ✅ Send success response
        res.status(200).json({ message: "Note Deleted successfully", note: note });

    } catch (error) {
        console.error("Error updating note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
