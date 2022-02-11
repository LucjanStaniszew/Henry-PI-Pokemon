import React from "react";
import { Link } from "react-router-dom";
import '../Styles/LandingPage.css';

export default function LandingPage() {
    return(
        <div className="background">
            <div className="container">
                <h4 className="Text">Developed by Luciano Staniszewski</h4>
                <Link to = "/home">
                    <button className="button"></button>
                </Link>
                <div className="right">
                    <a href="https://github.com/LucjanStaniszew">
                            <button className="Git" />
                    </a>
                    <a href="https://www.linkedin.com/in/luciano-staniszewski-784264222/">
                            <button className="LinkedIn" />
                    </a>
                    <a href="https://wa.me/5491133518159">
                            <button className="WhatsApp" />
                    </a>
                </div>
            </div>
        </div>
    )
}