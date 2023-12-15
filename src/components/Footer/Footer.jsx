import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                I have developed this project as part of my ongoing effort to explore various
                 aspects of frontend development using the React.js library. I trust that you
                  find the application engaging and informative. Your feedback is invaluable to
                   me, and I welcome any insights you may have. I am open to connecting and discussing 
                   this project or any other related topics. Please feel free to reach out to me
                    through the provided Linkedin handle below. I look forward to connecting with you.

                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                    <a href="https://www.linkedin.com/in/vaibhav-verma-tech-enthusiast" target="_blank" rel="noopener noreferrer" className="icon">
                        <FaLinkedin />
                    </a>
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;