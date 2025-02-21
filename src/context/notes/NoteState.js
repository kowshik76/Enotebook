import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:3000";
    const authToken = localStorage.getItem("token");
    const [notes, setNotes] = useState([]);

    // Get all notes
    const getallnotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": authToken
                }
            });

            if (!response.ok) {
                console.error("Error fetching notes:", response.statusText);
                return;
            }

            const json = await response.json();
            setNotes(Array.isArray(json) ? json : []);
        } catch (error) {
            console.error("Fetch error:", error);
            setNotes([]);
        }
    };

    // Add note
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": authToken
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
                "auth-token": authToken
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
                "auth-token": authToken
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
