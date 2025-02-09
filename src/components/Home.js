import React from 'react'
import { Notes } from './Notes'
export const Home = () => {

    return (
        <div>
            <h1>Notes</h1>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Your Notes</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Type Something" />
            </div>
            <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Type Something</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <div className="my-3">
                    <button type="button" className="btn btn-outline-danger">Save</button>
                </div>

            </div>
            <Notes />
        </div>
    )
}

export default Home