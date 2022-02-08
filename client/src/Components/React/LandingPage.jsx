import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <div className="background">
            <h1 className="title">Poke App</h1>
            <Link to = "/home">
                <button>Enter</button>
            </Link>
        </div>
    )
}