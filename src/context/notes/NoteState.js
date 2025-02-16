import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhYzZlZDM1MzE3OTU0MTUyMmEyMTA2In0sImlhdCI6MTczOTY5MTk5NiwiZXhwIjoxNzM5Njk1NTk2fQ.zmtToM1tshYdJjiREk3AJtk1L8UnShAbG1E6mrneb-Y";
    const host = "http://localhost:3000";
    const [notes, setNotes] = useState([]);

    // Get all notes
    const getallnotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": `${authtoken}`
            }
        });
        const json = await response.json();
        setNotes(json);
    };

    // Add note
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": `${authtoken}`
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes([...notes, note]);
    };

    // Delete note
    const deletenote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": `${authtoken}`
            }
        });
        setNotes(notes.filter(note => note._id !== id));
    };

    // Edit note
    const editnote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": `${authtoken}`
            },
            body: JSON.stringify({ title, description, tag })
        });
        await response.json();

        setNotes(notes.map(note => note._id === id ? { ...note, title, description, tag } : note));
    };

    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getallnotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;