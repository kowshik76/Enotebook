import React from 'react'

const Logo = () => {
    return (

        <div className="flex justify-center items-center h-screen">
            <div className="w-32 h-32 bg-gray-800 rounded-full flex justify-center items-center shadow-lg">
                <img src="/icon.png" alt="eNotebook Logo" className="w-20 h-20" />
            </div>
        </div>
    );
};

export default Logo