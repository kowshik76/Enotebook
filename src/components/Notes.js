import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { Notesitem } from './Notesitem';

export const Notes = () => {
    const context = useContext(NoteContext);
    const { notes } = context;

    return (
        <div>
            <div className="row my-3">
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return <Notesitem note={note} />;
                })}
            </div>
        </div>
    )
}
