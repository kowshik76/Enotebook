import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
export const About = () => {
    const user = useContext(NoteContext);
    useEffect(() => {
        user.update();

    }, [])

    return (
        <div>
            this is About  {user.use.name}
        </div>
    )
}

export default About