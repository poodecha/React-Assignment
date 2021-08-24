import { useState } from 'react';
import './App.css';
import LikeButton from './LikeButton/LikeButton';

const emptyNote = {
    content: ""
};

function App() {
    // - States
    const [note, setNote] = useState(emptyNote);
    const [editNote, setEditNote] = useState(null);
    const [allNotes, setAllNotes] = useState([]);

    // - Functions form inputs
    function onNoteValueChange(event) {
        const { name, value } = event.target;
        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function onEditNoteValueChange(event) {
        const { name, value } = event.target;
        setEditNote((prevEditNote) => {
            return {
                ...prevEditNote,
                [name]: value
            };
        });
    }

    // - Functions add, edit, delete
    function onNoteSubmit(event) {
        event.preventDefault();

        // Add note
        setAllNotes((prevAllNotes) => {
            const newNote = { ...note };
            newNote.id = Date.now().toString();
            return [newNote, ...prevAllNotes];
        });

        // Clear add form
        setNote(emptyNote);
    }

    function onEditNoteSubmit(event) {
        event.preventDefault();

        // Edit note
        setAllNotes((prevAllNotes) => {
            return prevAllNotes.map((note) => {
                if (note.id !== editNote.id) return note;
                return editNote;
            });
        });

        // Clear edit form
        setEditNote(null);
    }

    function onNoteDelete(noteId) {
        setAllNotes((prevAllNotes) => {
            return prevAllNotes.filter(note => note.id !== noteId);
        });
    }

    // - Elements
    const allNotesElements = allNotes.map((theNote) => {
        return (
            <div key={theNote.id} className="app-note">
                <p>{theNote.content}</p>
                <h5>{theNote.author}</h5>
                <p>
                <LikeButton/>
                    <button className="button-edit"onClick={() => {setEditNote(theNote)}}>Edit</button>
                    
                    <button className="button-delete"onClick={() => {onNoteDelete(theNote.id)}}>Delete</button>
                </p>
            </div>
        );
    });

    let editNoteElement = null;
    if (!!editNote) {
        editNoteElement = (
            <div className="app-edit-note">
                <form onSubmit={onEditNoteSubmit}>
                    <p>
                        <textarea
                            rows="3"
                            placeholder="Message"
                            name="content"
                            value={editNote.content}
                            onChange={onEditNoteValueChange}
                        />
                    </p>
                    
                    <p>
                        <button type="submit">Update</button>
                    </p>
                </form>
            </div>
        );
    }

    return (
        <body className="bg">
        
        <section className="app-section">
            <div className="app-container">
                <center>
                <h3 className="title">Simple Twitter</h3>
                <form onSubmit={onNoteSubmit}>
                    <p>
                        <textarea
                            rows="3"
                            placeholder="What do you thinking?"
                            name="content"
                            value={note.content}
                            onChange={onNoteValueChange}
                        />
                    </p>
                    
                    <p>
                        <button type="submit">Tweet</button>
                    </p>
                </form>
                <div className="app-notes">
                    {allNotesElements}
                </div>
                </center>
            </div>
            {editNoteElement}
        </section>
        </body>
    );
}

export default App;
