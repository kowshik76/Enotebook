import React from 'react'
export const Notesitem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body ">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i class="fa-solid fa-trash"></i>
                    <i class="fa-solid fa-file-pen mx-4"></i>
                </div>
            </div>
        </div>
    )
}
