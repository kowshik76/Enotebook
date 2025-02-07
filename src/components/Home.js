import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
export const Home = () => {
    let my = useContext(NoteContext);
    return (
        <div>
            This is {my.name}
        </div>
    )
}

export default Home