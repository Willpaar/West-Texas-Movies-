import React from 'react'
import './Header.css'
export default function Header(){
    return(
        <div className="header">
            <div className="upperHeader">
                <img src="/logo.png"/>
                <h1>West Texas Movies</h1>
                <div className="loginBtnCon">
                    {/*for now we keep the login button placeholder but when a user is logged in it will show an icon*/}
                    <button>Login</button>
                </div>
            </div>
            
            <div className="lowerHeader">
                <div className="menuOptionCon">
                    <button>Browse Movies</button>
                    <button id="upcomming">Upcoming Movies</button>
                    <button id="search">Search Movies</button>
                </div>
            </div>
        </div>
    )
}
