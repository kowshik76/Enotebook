import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const NotesInitial = [

        {
            "_id": "67a1ac71b2346a7602e65eff",
            "user": "679fa48b80d42fac0997754e",
            "title": "Make Less in MOre",
            "description": "NO time for chill,just make it in nill",
            "tag": "personal",
            "date": "2025-02-04T05:58:09.823Z",
            "__v": 0
        },
        {
            "_id": "67a1ac71b2346a7602e65eff",
            "user": "679fa48b80d42fac0997754e",
            "title": "Make Less in MOre",
            "description": "NO time for chill,just make it in nill",
            "tag": "personal",
            "date": "2025-02-04T05:58:09.823Z",
            "__v": 0
        },
        {
            "_id": "67a1ac71b2346a7602e65eff",
            "user": "679fa48b80d42fac0997754e",
            "title": "Make Less in MOre",
            "description": "NO time for chill,just make it in nill",
            "tag": "personal",
            "date": "2025-02-04T05:58:09.823Z",
            "__v": 0
        },
        {
            "_id": "67a1ac71b2346a7602e65eff",
            "user": "679fa48b80d42fac0997754e",
            "title": "Make Less in MOre",
            "description": "NO time for chill,just make it in nill",
            "tag": "personal",
            "date": "2025-02-04T05:58:09.823Z",
            "__v": 0
        },


    ]
    const [notes, setNotes] = useState(NotesInitial)

    //Add note
    const addnote = (title, description, tag) => {
        const note = {
            "_id": "67a1ac71b2346a7602e65eff",
            "user": "679fa48b80d42fac0997754e",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-02-04T05:58:09.823Z",
            "__v": 0
        };

        setNotes(notes.concat(note))
    }
    //delete note
    const deletenote = (id) => {
        console.log("Deleting");
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }
    //Edit a note
    const editnote = () => {

    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;