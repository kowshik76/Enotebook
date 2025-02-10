import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

export const Addnote = () => {
    const context = useContext(NoteContext);
    const { addnote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "default" })

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div> <h1>Notes</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Type Something" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange}></textarea>
                <div className="my-3">
                    <button type="button" className="btn btn-outline-danger" onClick={handleclick}>Save</button>
                </div>

            </div></div>
    )
}
