import React from 'react';
import { Notes } from './Notes';

export const Home = (props) => {
    return (
        <div className='container my-4'>

            <Notes ShowAlert={props.ShowAlert} />
        </div>
    );
};

export default Home;
