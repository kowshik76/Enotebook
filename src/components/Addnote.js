import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

export const Addnote = () => {
    const context = useContext(NoteContext);
    const { addnote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    const handleclick = (e) => {
        e.preventDefault();
        if (note.title.trim() === "" || note.description.trim() === "") {
            alert("Title and description cannot be empty!");
            return;
        }
        addnote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
    };

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Add Notes</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Type Something" value={note.title} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" value={note.description} onChange={onChange}></textarea>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <textarea className="form-control" id="tag" name="tag" placeholder="Type Something" rows="1" value={note.tag} onChange={onChange}></textarea>
                    <div className="my-3">
                        <button disabled={note.title.length === 0 || note.description.length === 0 || note.tag.length === 0} type="button" className="btn btn-outline-primary" onClick={handleclick}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
