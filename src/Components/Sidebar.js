import React, { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import '../Styles/sidebar.css';

export default function Sidebar() {
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const navRef = useRef();

    return (
        <div className='sidebar active'>
            <div className="logo-box">
                <div className='logo-logo' />
            </div>

            <a href="/home">Home</a>
            <a href="/articles">Articles</a>
            <a href="/short-stories">Short Stories</a>
            <a href="/about">About</a>
            {/* <a href="/admin">admin</a> */}

            <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                <FaTimes />
            </button>

            <button className='nav-btn' onClick={showNavbar}>
                <FaBars />
            </button>

        </div>
    );
}