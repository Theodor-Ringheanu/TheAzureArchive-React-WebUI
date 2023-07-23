import React, { useState, useRef } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import '../Styles/navbar.css';

export default function Navbar() {
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const navRef = useRef();

    const [navbarActive, setNavbarActive] = useState(false);
    const scrollDown = () => {
        if (window.scrollY >= 0) {
            setNavbarActive(true);
        } else {
            setNavbarActive(false);
        }
    }

    window.addEventListener('scroll', scrollDown);


    return (
        <div>
            <div className={navbarActive ? 'navbar active' : 'navbar'}>
                <div className='logo-box'>
                    <div className={navbarActive ? 'logo-text-logo active'
                        : 'logo-text-logo'} />
                </div>

                <div className="nav" ref={navRef}>
                    <a href="/home">Home</a>
                    <a href="/articles">Articles</a>
                    <a href="/short-stories">Short Stories</a>
                    <a href="/about#">About</a>

                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </div>

                <button className='nav-btn' onClick={showNavbar}>
                    <FaBars />
                </button>

            </div>

        </div>
    );
}
