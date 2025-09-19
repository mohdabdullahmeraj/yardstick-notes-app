import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import NoteModal from '../components/NoteModal';

function NotesPage() {
   const { user, logout, upgradePlan } = useAuth();
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const isFreeTier = user?.tenant?.plan === 'free';
    const atNoteLimit = notes.length >= 3;
    const canCreateNote = !isFreeTier || !atNoteLimit;

    useEffect(() => {
        api.get('/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error("Error fetching notes:", error));
    }, []);

    const handleOpenCreateModal = () => {
        if (!canCreateNote) return;
        setCurrentNote(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (note) => {
        setCurrentNote(note);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentNote(null);
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (currentNote) {
                const response = await api.put(`/notes/${currentNote._id}`, noteData);
                setNotes(notes.map(n => (n._id === currentNote._id ? response.data : n)));
            } else {
                const response = await api.post('/notes', noteData);
                setNotes([...notes, response.data]);
            }
            handleCloseModal();
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred.');
        }
    };
    
    const handleDeleteNote = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await api.delete(`/notes/${id}`);
                setNotes(notes.filter(note => note._id !== id));
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    return (
        <div className="container">
            <header>
                <h1>{user?.tenant?.name}'s Notes</h1>
                <span>Welcome, {user?.email}</span>
                <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </header>
            
            {isFreeTier && atNoteLimit && (
                <div className="upgrade-banner">
                    <span>You've reached your note limit.</span>
                    {user?.role === 'admin' ? (
                        <button className="btn btn-primary" onClick={upgradePlan}>Upgrade to Pro</button>
                    ) : (
                        <span>Please ask an admin to upgrade.</span>
                    )}
                </div>
            )}

            <div className="notes-header">
                <h2>Your Notes</h2>
                <button className="btn btn-primary" onClick={handleOpenCreateModal} disabled={!canCreateNote}>
                    Create New Note
                </button>
            </div>

            <ul>
                {notes.map(note => (
                    <li key={note._id} className="note-item">
                        <div className="note-content">
                            <strong>{note.title}</strong>
                            <p>{note.content}</p>
                        </div>
                        <div className="note-actions">
                            <button className="btn btn-warning" onClick={() => handleOpenEditModal(note)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteNote(note._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <NoteModal
                    note={currentNote}
                    onSave={handleSaveNote}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default NotesPage;