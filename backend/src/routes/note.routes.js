const express = require('express');
const router = express.Router();
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/note.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { checkNoteLimit } = require('../middleware/subscription.middleware');

router.use(authenticate);

router.post('/', checkNoteLimit, createNote);
router.get('/', getNotes);
router.route('/:id')
    .get(getNoteById)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;