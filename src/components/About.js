import React from "react";

const About = () => {
    return (
        <>
            <div className="about">
                <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", textAlign: "center" }}>
                    <h1>About <span>enotebook</span></h1>
                    <p>
                        eNotebook is a simple and secure note-taking app that allows users to create, edit, and manage their notes easily.
                        It features authentication to ensure privacy and helps you keep track of your important information.
                    </p>

                    <h2>About Me</h2>
                    <p>
                        Hi, I’m <strong>Jaya Venkata Sai Kowshik Sangada</strong>, an aspiring full-stack developer passionate about
                        building web applications. I have experience in Java, React, MySQL, and love working on new projects that
                        enhance user experience and functionality.
                    </p>
                </div>
            </div>
        </>
    );
};

export default About;
