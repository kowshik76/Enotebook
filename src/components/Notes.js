import React, { useContext, useEffect, useRef, useState } from 'react'
import { Notesitem } from './Notesitem';
import { Addnote } from './Addnote';
import NoteContext from '../context/notes/NoteContext';



export const Notes = () => {
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const context = useContext(NoteContext);

    const { notes, getallnotes, editnote } = context;
    useEffect(() => {
        getallnotes()
    }, [getallnotes])
    const ref = useRef(null)
    const refclose = useRef(null)


    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({
            id: currentNote._id,
            etitle: currentNote.title || "",
            edescription: currentNote.description || "",
            etag: currentNote.tag || ""
        });
    };



    const handleclick = () => {
        if (note.etitle.trim() === "" || note.edescription.trim() === "") {
            alert("Title and description cannot be empty!");
            return;
        }
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
    };


    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Addnote />

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                example
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Type Something" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" rows="3" value={note.edescription} onChange={onChange}></textarea>

                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <textarea className="form-control" id="etag" name="etag" placeholder="Type Something" rows="1" value={note.etag} onChange={onChange}></textarea>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row my-3">
                    <h3>Your Notes</h3>
                    <div className="container">
                        {notes.length === 0 && 'No Notes To Display!!'}

                    </div>
                    {notes.map((note) => {
                        return <Notesitem key={note._id} note={note} updateNote={updateNote} />;
                    })}
                </div>
            </div>
        </>
    )
}
