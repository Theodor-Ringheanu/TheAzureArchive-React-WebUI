import React from 'react';
import { HashLink as Link} from "react-router-hash-link";
import '../Styles/footer.css';

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
                        <h4>Good To Know</h4>
                        <Link smooth to="/about#contact">
                            <p>Contact</p>
                        </Link>
                        <Link smooth to="/home#updates">
                            <p>Sign Up for Updates</p>
                        </Link>
                        <Link smooth to="/about#Q&A">
                            <p>Q&A</p>
                        </Link>
                    </div>
                    <div className='ft_footer-links-div'>
                        <h4>Legal Jabber</h4>
                        <Link instant to="/privacy#">
                            <p>Privacy Policy</p>
                        </Link>
                        <Link instant to="/copyright#">
                            <p>Copyright</p>
                        </Link>
                    </div>
                    
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