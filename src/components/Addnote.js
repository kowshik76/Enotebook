import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

export const Addnote = (props) => {
    const context = useContext(NoteContext);
    const { addnote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    const handleclick = (e) => {
        e.preventDefault();
        if (note.title.trim() === "" || note.description.trim() === "") {
            props.ShowAlert("Title and Description cannot be empty", "danger");
            return;
        }

        if (note.title.length < 5 || note.description.length < 5 || note.tag.length < 5) {
            props.ShowAlert("Title, Description, and Tag should be at least 5 characters!", "danger");
            return;
        }

        addnote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });

        props.ShowAlert("Note Created Successfully!", "success");
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
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" placeholder="Type Something" value={note.tag} onChange={onChange} />
            </div>
            <div className="my-3">
                <button disabled={note.title.length === 0 || note.description.length === 0 || note.tag.length === 0} type="button" className="btn btn-outline-primary" onClick={handleclick}>
                    Save
                </button>
            </div>
        </div>
    );
};
