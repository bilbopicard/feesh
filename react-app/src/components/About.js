import React from 'react';
import jamie from '../images/jamie.png';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './styles/about.css';

function About() {

    return (
        <>
            <div className='nav-empty-div'></div>
            {/* <h1>About me</h1> */}
            <div id='about-container'>
                <div id="img-div-about">
                    <img src={jamie} id='about-pic' alt='Jamie, the developer' />
                </div>
                <div id='about-right-div'>
                    <h2 id='my-name'> Jamie Sullivan</h2>
                    <p>I hope you enjoyed Feesh. It's a silly idea but I had a lot of fun working on this application and learned an incredible amount throughout the process. I enjoy things that are fundamentally simple but overly engineered and Feesh was born from that idea. It ended up being tremendously challenging but simultaneously a good time. Thank you for stopping by :) </p>
                    <div id='about-links'>
                        <a href='https://github.com/bilbopicard' target='_blank' rel="noreferrer">GitHub <FaGithub /></a>
                        <a href='https://www.linkedin.com/in/sullivan-jamie/' target='_blank' rel="noreferrer">LinkedIn <FaLinkedin /></a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default About;