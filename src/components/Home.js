import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notes } from './Notes';

export const Home = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging statement
        if (!token) {
            console.log('No token found, redirecting to login'); // Debugging statement
            navigate('/login'); // Redirect if token is missing
        } else {
            console.log('Token found, staying on home page'); // Debugging statement
        }
    }, [navigate]);

    return (
        <div className='container mt-4'>
            <Notes ShowAlert={props.ShowAlert} />
        </div>
    );
};

export default Home;