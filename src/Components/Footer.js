import React from 'react';
import '../Styles/App.css';
// import li from '../assets/Images/linkedin_icon.png';
// import fb from '../assets/Images/facebook_icon.png';


const Footer = () => {
    return (
        <div className="footer">
            <div className="ft_footer section-padding">
                <div className='ft_footer-logo-div'>
                    <a href="/home/">
                    </a>
                </div>
                <div className='ft_footer-links'>
                    <div className='ft_footer-links-div'>
                        <h4>General Stuff</h4>
                        <a href="/contact">
                            <p>Contact</p>
                        </a>
                        <a href="/home">
                            <p>Sign Up for Updates</p>
                        </a>
                        <a href="/faq">
                            <p>FAQ</p>
                        </a>
                    </div>
                    <div className='ft_footer-links-div'>
                        <h4>Legal Jabber</h4>
                        <a href="/terms-and-conditions">
                            <p>Terms & Conditions</p>
                        </a>
                        <a href="/privacy">
                            <p>Privacy Policy</p>
                        </a>
                        <a href="/copyright">
                            <p>Copyright</p>
                        </a>
                    </div>
                    {/* <div className='ft_footer-links-div'>
                        <div className='socialMedia'>
                            <p><img alt="social media icon1" src={li}></img></p>
                            <p><img alt="social media icon2" src={fb}></img></p>
                        </div>
                    </div> */}
                </div>

                <div className='ft_footer-below'>
                    <div className='ft_footer-copyright'>
                        <p>
                            @{new Date().getFullYear()} The Azure Archive. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;