import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:3000";
    const NotesInitial = []
    const [notes, setNotes] = useState(NotesInitial)

    //Add note
    const addnote = async (title, description, tag) => {
        //Api call and logic 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhYzZlZDM1MzE3OTU0MTUyMmEyMTA2In0sImlhdCI6MTczOTM1NzcwMCwiZXhwIjoxNzM5MzYxMzAwfQ.C3YMHu__Dgfashl78EIbmybK3wWsMriH_ixzDwfPVMM"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = {
            "_id": "67ac6f7953179541522a210b",
            "user": "67ac6ed353179541522a2106",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-02-04T05:58:09.823Z",
            "__v": 0
        };

        setNotes(notes.concat(note))
    }
    //Get all note
    const getallnotes = async () => {
        //Api call and logic 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhYzZlZDM1MzE3OTU0MTUyMmEyMTA2In0sImlhdCI6MTczOTM1NzcwMCwiZXhwIjoxNzM5MzYxMzAwfQ.C3YMHu__Dgfashl78EIbmybK3wWsMriH_ixzDwfPVMM"
            }

        });
        const json = await response.json();
        console.log(json);
        setNotes(json)
    }
    //delete note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhYzZlZDM1MzE3OTU0MTUyMmEyMTA2In0sImlhdCI6MTczOTM1NzcwMCwiZXhwIjoxNzM5MzYxMzAwfQ.C3YMHu__Dgfashl78EIbmybK3wWsMriH_ixzDwfPVMM"
            }

        });
        const json = response.json();

        console.log("Deleting");
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }
    //Edit a note
    const editnote = async (id, title, description, tag) => {

        //Api call and logic 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhYzZlZDM1MzE3OTU0MTUyMmEyMTA2In0sImlhdCI6MTczOTM1NzcwMCwiZXhwIjoxNzM5MzYxMzAwfQ.C3YMHu__Dgfashl78EIbmybK3wWsMriH_ixzDwfPVMM"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();



        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;

            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getallnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;