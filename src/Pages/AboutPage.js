import React from 'react';
import '../Styles/App.css'
import Navbar from "../Components/Navbar.js";
import construction from "../assets/Images/under_construction.jpg";

const ContactPage = () => {
    return (
        <div>
            <div>
                <React.Fragment>
                    <Navbar />
                </React.Fragment>
                <div>
                    <div>
                        <img src={construction} alt='page under construction'></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;