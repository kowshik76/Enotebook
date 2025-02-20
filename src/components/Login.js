import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {

    const [credentials, setcredentials] = useState({ mail: "", password: "" })
    let navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: credentials.mail, password: credentials.password })
        });
        const json = await response.json();

        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/home");
            props.ShowAlert("Login Success!", "success");

        } else {
            props.ShowAlert("Invalid Details", "danger");
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-4'>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="mail" name='mail' value={credentials.mail} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={credentials.password} onChange={onChange} id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
