import React from 'react';
import '../Styles/App.css'
import '../Styles/about.css'
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";

const AboutPage = () => {
    return (
        <div className="about">
            <Navbar />
            <div className='about-header-img' />
            <div className='about-header'>
                <h1>About</h1>
            </div>

            <div className='about-box'>
                <h2>Can I publish my own articles and stories?</h2>
                <h3>Hit me up at the azurearchive@gmail.com and we’ll go from there.</h3>
                <h2>Is fanfiction allowed?</h2>
                <h3>As long as you have a written permission from the rightful owners or they’ve
                    publicly stated being okay with fanfiction, I don't see why not.</h3>
                <h2>Would you do commissions or joint projects?</h2>
                <h3>Sure thing.</h3>
                <h2>Favourite author, setting, and story?</h2>
                <h3>Brandon Sanderson, Warhammer 40k, Arcane. I wanna see a mixture of the these before I die.</h3>
                <h2>Any advice for a fellow writer?</h2>
                <h3>Procrastination be a scrab in the dungbie.</h3>
                <h2>Cool art, who's the artist?</h2>
                <h3>Credits for the backgrounds of the main pages go to 
                    Liu Zishan. I truly recommend you check more of his stuff at makie.artstation.com .
                    For the covers, it's either me, ai, public domain or the artists credited 
                    at the end of each page.</h3>
            </div>

            <Footer />

        </div>
    );
}

export default AboutPage;