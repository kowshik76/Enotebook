import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export const Notesitem = (props) => {
    const context = useContext(NoteContext);
    const { deletenote } = context;

    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body ">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash" onClick={() => { deletenote(note._id) }}></i>
                    <i className="fa-solid fa-file-pen mx-4" onClick={() => updateNote(note)}></i>

                </div>
            </div>
        </div>
    )
}
