import { useState, useEffect } from 'react';

function NoteModal({ note, onSave, onClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [note]);

    const handleSave = () => {
        onSave({ title, content });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
                <div className="form-group">
                    <input
                        id="note-title"
                        type="text"
                        placeholder=" "
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="note-title" className="form-label">Title</label>
                </div>
                <div className="form-group">
                     <textarea
                        id="note-content"
                        placeholder=" "
                        className="form-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="5"
                    ></textarea>
                     <label htmlFor="note-content" className="form-label">Content</label>
                </div>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default NoteModal;