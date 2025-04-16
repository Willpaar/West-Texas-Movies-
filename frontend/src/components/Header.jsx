import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
export default function Header(){
    return(
        <div className="header">
            <div className="upperHeader">
                <Link to="/">
                    <img src="/logo.png"/>
                </Link>
                <Link to="/">
                    <h1>West Texas Movies</h1>
                </Link>
                <Link to="/Login">
                <div className="loginBtnCont">
                    {/*for now we keep the login button placeholder but when a user is logged in it will show an icon*/}
                    <button>Login</button>
                </div>
                </Link>
            </div>
            
            <div className="lowerHeader">
                <div className="menuOptionCont">
                    <button><Link to="/Browse">Browse Movies</Link></button>
                    <button><Link to="/Upcoming">Upcoming Movies</Link></button>
                    <button><Link to="/Search">Search Movies</Link></button>
                </div>
            </div>
        </div>
    )
}
