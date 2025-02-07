import React from 'react';
import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const state = {
        "name": "HElloo"
    }
    const [use, setUse] = useState(state)
    const update = () => {
        setTimeout(() => {
            setUse({
                "name": "Tanda"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{ use, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;