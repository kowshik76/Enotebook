import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: "", mail: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    // Set the API URL based on the environment
    const host = process.env.NODE_ENV === 'production' ? 'https://enotebook-uor5.onrender.com' : 'http://localhost:3000';

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, mail: credentials.mail, password: credentials.password }),
        });

        const json = await response.json();
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/home');
            props.ShowAlert("Account Created successfully!", "success");
        } else {
            props.ShowAlert("Invalid Details", "danger");
        }
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-5'>
            <div className="container">
                <h1>Signup to <span>EnoteBook</span></h1>
            </div>
            <form onSubmit={handlesubmit}>
                <div className="md-4">
                    <label htmlFor="name" className="form-label"> Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name='name' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="mail" onChange={onChange} name='mail' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};