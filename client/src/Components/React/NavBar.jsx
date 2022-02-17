import React from "react";
import { Link } from "react-router-dom";
import '../Styles/NavBar.css'

export default function NavBar() {
    return(
        <Link to="/home">
            <h1 className='title'>Pokemon App</h1>
        </Link>
    )
}