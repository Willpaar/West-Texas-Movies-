import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useState, useEffect } from 'react';

export default function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userID = sessionStorage.getItem('userID');
        setIsLoggedIn(!!userID); // true if userID exists
    }, []);

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
                {isLoggedIn ? (
                        <Link to="/Profile">
                            <img src="/usericon.png"></img> 
                        </Link>
                    ) : (
                        <Link to="/Login">
                            <button>Login</button>
                        </Link>
                    )}
                </div>
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
