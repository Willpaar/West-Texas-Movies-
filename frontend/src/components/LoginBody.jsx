import React, { useState } from 'react';
import './LoginBody.css'


export default function LoginBody(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [apt, setApt] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all required fields are filled (except 'apt')
        if (!email || !name || !phone || !address || !password || !confirmPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        // Function to check if a string contains commas
        const containsComma = (str) => str.includes(',');

        // Check if any field contains a comma (commas will mess up csv format)
        if (
            containsComma(email) ||
            containsComma(name) ||
            containsComma(phone) ||
            containsComma(address) ||
            containsComma(apt) ||
            containsComma(password) ||
            containsComma(confirmPassword)
        ) {
            alert("Commas are not allowed in any of the fields!");
            return;
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare the data
        const userData = {
            email,
            name,
            phone,
            address,
            apt,
            password,
        };

        // Send the data to the server
        fetch('http://localhost:8000/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Account created successfully!');
                window.location.hash = '';
            } else {
                switch (data.errorCode) {
                    case 0:
                        alert("Email is already taken.");
                        break;                       
                    case -1:
                        alert("Invalid email format.");
                        break;
                    case -2:
                        alert("Invalid name format.");
                        break;
                    case -3:
                        alert("Invalid phone number format.");
                        break;
                    case -4:
                        alert("Invalid address format.");
                        break;
                    default:
                        alert('Failed to create account.');
                }
            }
        })
        
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error creating your account.');
        });
    };

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
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="text" placeholder="Apt (Optional)" value={apt} onChange={(e) => setApt(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button id="createAccBtn" onClick={handleSubmit}>Create Account</button>
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
