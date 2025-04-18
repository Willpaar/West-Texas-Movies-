import React from 'react'
import './LoginBody.css'
export default function LoginBody(){
    return(
        <div className="loginBody">
            <div className="loginCont">
                <h1>Login</h1>
                <input type="text" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <div className="signUpCont">
                    <p>Not Registered?</p>
                    {/*will make a pop up that shows the signup menu*/}
                    <a href="#SignUp">Sign Up</a>
                </div>
                <div className="forgotCont">
                    <p>Forgot Password?</p>
                    {/*will make a pop up that shows the change password menu*/}
                    <a href="#ResetPassword">Reset Password</a>
                </div>
                <button id="signInBtn">Sign In</button>
            </div>


            <div id="SignUp" class="popupOverlay">
                <div class="popup">
                    <a href="#" class="close">&times;</a>
                    <h2>Sign Up</h2>
                    <input type="text" placeholder="Email" required/>
                    <input type="text" placeholder="Full Name" required/>
                    <input type="tel" placeholder="Phone Number" pattern="[0-9]{10}"required/>
                    <input type="text" placeholder="Address" required/>
                    <input type="password" placeholder="Password" required/>
                    <input type="password" placeholder="Confirm Password" required/>
                    <button id="createAccBtn">Create Account</button>
                </div>
            </div>

            <div id="ResetPassword" className="popupOverlay">
                <div className="popup">
                    <a href="#" class="close">&times;</a>
                    <h2>Reset Password</h2>
                    <input type="text" placeholder="Email" required/>
                    <button id="sendEmail">Send Email</button>
                </div>
            </div>
            
        </div>
    )
}
