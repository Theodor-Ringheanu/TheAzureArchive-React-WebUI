import React from 'react';
import '../Styles/App.css'
import '../Styles/legal.css'
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";

const AboutPage = () => {
    return (
        <div className="ap">
            <Navbar />
            <div className='navbar-background' />

            <div className='header-img' />
            <div className='header'>
                <h1>The Copyright Act</h1>
            </div>

            <div className='text'>
                <h2>Preamble</h2>
                <h3>We, the Keepers of The Azure Archive establish this
                    Copyright Act to assert and safeguard the intellectual
                    property rights associated with our humble platform.
                    Recognizing the significance of promoting creativity,
                    we hereby declare our dedication to fostering an
                    environment that respects the rights of our valued
                    contributors while preserving the authenticity of our
                    distinctive content. </h3>
                <h3>In order to form a harmonious community of writers,
                    storytellers and enthusiasts, promote the progress of
                    knowledge, literature and the arts, and secure the
                    blessings of inspiration to ourselves and future
                    generations, we do hereby ordain and establish the
                    following principles:</h3>

                <h2>Article I: Ownership and Trademarks</h2>
                <div className='copyright'>
                    <h3>Section 1: The Azure Archive Ownership</h3>
                    <h3>1.1 The Azure Archive asserts full ownership and
                        control over its distinctive trademarks, including
                        but not limited to logos, symbols, and brand names
                        associated with our platform.</h3>
                    <h3>1.2 Any unauthorized use, reproduction, or
                        distribution of The Azure Archive's trademarks is
                        strictly prohibited, unless express written
                        permission is granted by The Azure Archive's
                        authorized representatives.</h3>
                </div>

                <h2>Article II: Author’s Rights</h2>
                <div className='copyright'>
                    <h3>Section 1: Ownership and Rights</h3>
                    <h3>1.1 Text or audio content creators or content
                        copyright owners, herein referred to as "Authors"
                        retain full ownership of their individual
                        contributions published on The Azure Archive,
                        hereafter referred to as "Stories."</h3>
                    <h3>1.2 By submitting Stories to The Azure Archive,
                        Authors grant The Azure Archive a non-exclusive,
                        worldwide, royalty-free license to reproduce,
                        distribute, and publicly display the Stories on
                        The Azure Archive's platform for the purpose of
                        promoting, showcasing, and facilitating the
                        enjoyment of the content.</h3>
                    <h3>1.3 Authors retain the right to further exploit
                        their Stories, including publishing them elsewhere
                        or granting additional licenses, without any
                        obligation to seek approval from The Azure Archive.</h3>
                    <h3>1.4 The Azure Archive acknowledges and respects the
                        moral rights of Authors, including the right to be
                        identified as the creator of their Stories.</h3>
                </div>

                <h2>Article III: Artist's Rights</h2>
                <div className='copyright'>
                    <h3>Section 1: Ownership and Rights</h3>
                    <h3>1.1 Artwork creators or artwork copyright owners,
                        herein referred to as "Artists," retain full
                        ownership and control over their respective images
                        and artworks, hereafter referred to as "Artwork."</h3>
                    <h3>1.2 The Azure Archive recognizes the importance of
                        respecting the rights of Artists and will not use
                        or reproduce any Artwork without permission from the
                        Artists or abiding to the Artwork’s license to use.</h3>
                    <h3>1.3 By submitting Artwork to The Azure Archive,
                        Artists grant The Azure Archive a non-exclusive,
                        worldwide, royalty-free license to reproduce,
                        distribute, and publicly display the Artwork on
                        The Azure Archive's platform solely for the purpose
                        of promoting, showcasing, and enhancing the overall
                        visual experience of the user.</h3>
                    <h3>1.4 Artists retain the right to further exploit
                        their Artwork, including publishing them elsewhere
                        or granting additional licenses, without any
                        obligation to seek approval from The Azure Archive.</h3>
                </div>

                <h2>Article IV: Enforcement</h2>
                <div className='copyright'>
                    <h3>Section 1: Intellectual Property Infringement</h3>
                    <h3>1.1 The Azure Archive pledges to investigate any
                        alleged infringement of intellectual property rights
                        brought to its attention.</h3>
                    <h3>1.2 If The Azure Archive finds substantial evidence
                        supporting the claim of infringement, it will
                        promptly take appropriate action, including but not
                        limited to removing the infringing content from its
                        platform and assisting in legal proceedings if
                        required.</h3>
                </div>

            </div>

            <Footer />

        </div>
    );
}

export default AboutPage;