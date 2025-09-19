const Note = require('../models/note.model');

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({
        title,
        content,
        user: req.user.id,
        tenant: req.user.tenantId,
    });
    await newNote.save();
    res.status(201).json(newNote);
};

exports.getNotes = async (req, res) => {
    const notes = await Note.find({ tenant: req.user.tenantId }); 
    res.json(notes);
};

exports.getNoteById = async (req,res) => {
    try{

        const note = await Note.findOne({
            _id: req.params.id,
            tenant: req.user.tenantId,
        })
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json(note);
    }catch(error){
        res.status(500).json({ message: 'Server error while retrieving note' });
    }
}

exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                tenant: req.user.tenantId,
            },
            { title, content },
            { new: true } 
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found or you do not have permission to edit it' });
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating note' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            tenant: req.user.tenantId, 
        });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found or you do not have permission to delete it' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting note' });
    }
};