import React, { useEffect, useState, useRef } from "react";
import jwt_decode from "jwt-decode";
import { FaBars, FaTimes } from 'react-icons/fa';
import '../Styles/footer.css';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);

    // create ref for adjusting nav element when menu is clicked
    const navRef = useRef();

    // function to toggle responsive_nav class on nav element
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    // set up user state and tokenLoaded boolean state with useState hooks
    const [user, setUser] = useState({});
    const [tokenLoaded, setTokenLoaded] = useState({});

    // define function to hide sign-in div (for Google button)
    function hideSignInDiv() {
        // Hide signInDiv and make sure to have `display:none;` in CSS for google-btn class
        const signInDiv = document.querySelector(".google-btn");
        signInDiv.style.display = "none";
    }

    // define function to show sign-in div (for Google button)
    function showSignInDiv() {
        // Show signInDiv and make sure to have `display:initial;` in CSS for google-btn class
        const signInDiv = document.querySelector(".google-btn");
        signInDiv.style.display = "initial";
    }

    // check if token present in local storage on page load with useEffect hook
    useEffect(() => {
        const token = localStorage.getItem("myToken");
        if (token) {
            // decode token and set to user state
            let userObject = jwt_decode(token);
            setUser(userObject);
            // hide sign-in div since user already logged in
            hideSignInDiv();
        } else {
            setTokenLoaded(true);
        }
    }, []);

    // handle response from Google Sign-In credential with callback function
    function handleCallbackResponse(response) {
        // decode JWT token and log result
        console.log("Encoded JWT ID token: " + response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        hideSignInDiv();

        // Store token in local storage
        localStorage.setItem("myToken", response.credential);
    }

    // handle user sign-out button click
    function handleSignOut() {
        setUser({});
        showSignInDiv();

        // Remove token from local storage
        localStorage.removeItem("myToken");
        // reload window to clear any remaining user data
        window.location.reload();
    }

    // initialize Google API on load with another useEffect hook
    // check if token loaded yet before rendering Google API 
    useEffect(() => {
        if (tokenLoaded) {
            initializeGoogleAPI();
        }
    }, [tokenLoaded]);

    // initialize Google API script and render Google Sign-In button 
    function initializeGoogleAPI() {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id:
                    "",
                callback: handleCallbackResponse,
            });

            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {
                    theme: "outline",
                    size: "medium"
                }
            );
        };

        document.body.appendChild(script);
    }

    // determine if user is signed in by checking if user state has any keys
    const isSignedIn = Object.keys(user).length !== 0;

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeBackground);

    return (
        <div className={navbar ? 'navbar active' : 'navbar'}>
            <div className="logo-box">
            <a href='/home'>
                <div className={navbar ? 'logo-text-logo active'
                    : 'logo-text-logo'}/>
            </a>
            </div>

            <nav ref={navRef}>
                <a href="/blog">BLOG</a>
                <a href="/short-stories">SHORT STORIES</a>
                <a href="/about">ABOUT</a>

                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>

            <button className='nav-btn' onClick={showNavbar}>
                <FaBars />
            </button>

            {/* show Google button or Logout button depending on user state */}
            <div>
                {!isSignedIn && <div className="google-btn" id="signInDiv" />}
                {isSignedIn && (
                    <button className="google-btn" onClick={handleSignOut}>
                        Sign Out
                    </button>
                )}
            </div>
        </div>
        
    );
}
