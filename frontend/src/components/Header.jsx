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
                <div className="loginBtnCont">
                    {/*for now we keep the login button placeholder but when a user is logged in it will show an icon*/}
                    <button>Login</button>
                </div>
            </div>
            
            <div className="lowerHeader">
                <div className="menuOptionCont">
                    <button>Browse Movies</button>
                    <button id="upcomming">Upcoming Movies</button>
                    <button id="search">Search Movies</button>
                </div>
            </div>
        </div>
    )
}
