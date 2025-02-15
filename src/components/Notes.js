import React, { useContext, useEffect } from 'react'
import { Notesitem } from './Notesitem';
import { Addnote } from './Addnote';
import NoteContext from '../context/notes/NoteContext';


export const Notes = () => {
    const context = useContext(NoteContext);

    const { notes, getallnotes } = context;
    useEffect(() => {
        getallnotes()
    }, [])
const updateNote=()=>{
    
}

    return (
        <>
            <Addnote />
            <div>
                <div className="row my-3">
                    <h3>Your Notes</h3>
                    {notes.map((note) => {
                        return <Notesitem key={note._id} note={note} updateNote={updateNote} />;
                    })}
                </div>
            </div>
        </>
    )
}
