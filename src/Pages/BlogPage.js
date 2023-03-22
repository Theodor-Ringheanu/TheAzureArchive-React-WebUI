import React from 'react';
import '../Styles/App.css'
import Navbar from "../Components/Navbar.js";
import construction from "../assets/Images/under_construction.jpg";

const BlogPage = () => {
    return (
        <div>

            <React.Fragment>
                <Navbar />
            </React.Fragment>

            <div>
                <div>
                    <img src={construction}></img>
                </div>
            </div>

        </div>
    );
}

export default BlogPage;