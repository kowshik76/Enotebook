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
        }

    ]
    const [notes, setNotes] = useState(NotesInitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;