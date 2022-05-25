import React from "react";
import { Link } from "react-router-dom";
import ball from '../../PokeImagenes/SB.png'
import '../Styles/NavBar.css'

export default function NavBar() {
    return(
        <Link className="title" to="/home">
            <button className="ball"></button>
            {/*<h1 className='title'>Pokemon App</h1>*/}
        </Link>
    )
}