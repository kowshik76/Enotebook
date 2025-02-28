import React, { useState, useEffect } from "react";
import icon from "./icon.png";

const Enotebook = () => {
    const [startTransition, setStartTransition] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStartTransition(true);
        }, 1000);
    }, []);

    return (
        <>
            <div className="container4">
                <h1>
                    Welcome to <span>EnoteBook</span>
                </h1>
            </div>
            <div className="motion">
                <div className="container3">
                    <div className={`logo-container ${startTransition ? "move-left" : ""}`}>
                        <img
                            style={{ borderRadius: "50%" }}
                            src={icon}
                            alt="eNotebook Logo"
                            className="logo"
                        />
                    </div>
                    {startTransition && (
                        <h1 className="animated-text">Note it Everywhere</h1>
                    )}
                </div>

            </div>

            <div className="main2">
                <div className="container2">
                    <h5>
                        <span>Enotebook</span> is a digital note-taking application designed to provide
                        users with a seamless experience in creating, managing, and
                        accessing notes. The platform allows users to create, edit, and
                        delete notes with a rich-text editor, ensuring easy organization and
                        retrieval. Notes are securely stored in the cloud, enabling
                        synchronization across multiple devices. Users can categorize notes
                        using tags and folders for better organization. The project
                        incorporates user authentication with login and signup
                        functionality, ensuring privacy and security. The frontend is built
                        using React.js, styled with Tailwind CSS, and enhanced with
                        animations from Framer Motion. The backend, powered by Node.js and
                        Express.js, handles authentication and database operations using
                        MongoDB. The UI follows a black-and-white minimalistic design

                    </h5>
                </div>
            </div>
        </>
    );
};

export default Enotebook;
