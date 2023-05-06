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
                <h1>The Declaration of Privacy</h1>
            </div>

            <div className='text'>
                <h3>When in the course of online interactions,
                    it becomes necessary for a platform to
                    disclose the privacy policy which governs
                    the collection and use of personal information,
                    a decent respect to the opinions of mankind
                    requires that such website should declare the
                    causes which impel them to disclose.</h3>
                <h3>We hold these truths to be self-evident,
                    that all users are equal before the law,
                    and are endowed by their governing bodies
                    with certain unalienable rights, that among
                    these are privacy, security, and the pursuit
                    of personal data protection. That to secure
                    these rights, privacy policies are instituted
                    among websites, deriving their just powers
                    from the consent of the users.</h3>
                <h3>Prudence, indeed, will dictate that privacy
                    policies should not be changed for light
                    and transient causes; and accordingly,
                    all policies shall be established upon the
                    principle of protecting user privacy and
                    data security, and shall be reviewed regularly
                    to ensure that they remain consistent with
                    this principle. Whenever any policy becomes
                    destructive of these ends, or at any given
                    time, it is the right of the users to request,
                    alter or withdraw their consent to the
                    processing of their data, and to propose a
                    new policy, laying its foundation on such
                    principles and organizing its powers in such
                    form, as to them shall seem most likely to
                    affect their safety and peace of mind.</h3>
                <h3>We, therefore, the Keepers of The Azure Archive,
                    do solemnly publish and declare, that we have
                    established policies for the protection of
                    user privacy and data security, and that we
                    strive to maintain and uphold these policies
                    with the utmost integrity and fidelity.
                    As we pledge to use appropriate technological
                    and operational security measures to protect
                    personal information collected through the
                    use our website, and to use such information
                    solely for the purposes for which it was
                    unequivocally collected, or with the consent
                    of the user, we must acknowledge in good faith
                    that we cannot always guarantee the security
                    of information that the user sends over the
                    internet. Notwithstanding, we remain vigilant
                    in ensuring the proper collection, processing,
                    and retention of personal information, and
                    this Declaration shall serve as the
                    foundation for the protection of our users’
                    privacy and data security, and shall remain
                    in force and effect as long as our platform exists.</h3>

            </div>
            
            <Footer />

        </div>
    );
}

export default AboutPage;