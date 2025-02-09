import React from 'react'

export const Alert = (props) => {
    const { message } = props;
    return (
        <div><div className="alert alert-info" role="alert">
            {message}
        </div></div>
    )
}
