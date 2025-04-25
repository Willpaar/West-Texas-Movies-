import React, { useEffect, useState } from 'react';
import './ProfileBody.css';

export default function ProfileBody() {
    const [userData, setUserData] = useState(null);
    const [newEmail, setEmail] = useState('');
    const [newAdminEmail, setAdminEmail] = useState('');
    const [newName, setName] = useState('');
    const [newPhone, setPhone] = useState('');
    const [newAddress, setAddress] = useState('');
    const [newApt, setApt] = useState('');
    const [confirmDelete, setConfirmDelete] = useState('');
    const [newOldPassword, setOldPassword] = useState('');
    const [newNewPassword, setNewPassword] = useState('');

    useEffect(() => {
        const userID = sessionStorage.getItem('userID');
        if (!userID) return;

        fetch('http://localhost:8000/get-user-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: parseInt(userID) })
        })
            .then(response => response.json())
            .then(data => {
                const processed = processUserData(data); // use the function
                if (processed) {
                    setUserData(processed);
                }
            })
            .catch(err => console.error('Error fetching user data:', err));
    }, []);

    function processUserData(data) {
        if (data.success && data.data) {
            return {
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone,
                address: data.data.address,
                apt: data.data.apt,
                admin: data.data.admin
            };
        } else {
            console.error('Failed to process user data:', data.errorCode);
            return null;
        }
    }

    const { name, email, phone, address, apt, admin } = userData || {};

    const containsComma = (str) => str.includes(',');

    const changeName = (e) => {
        e.preventDefault();

        if (containsComma(newName)) {
            alert("Commas are not allowed!");
            return;
        }


        if (!newName) {
            alert("Please enter a name.");
            return;
        }

        const userID = sessionStorage.getItem('userID');

        const sendData = {
            ID: userID,
            name: newName
        };

        fetch('http://localhost:8000/Change-Name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Successfully changed Name!');
                window.location.reload();
            } else {
                alert('Invalid name format.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error changing your name.');
        });
    };

    const changeEmail = (e) => {
        e.preventDefault();

        if (containsComma(newEmail)) {
            alert("Commas are not allowed!");
            return;
        }

        if (!newEmail) {
            alert("Please enter an email.");
            return;
        }

        const userID = sessionStorage.getItem('userID');

        const sendData = {
            ID: userID,
            email: newEmail
        };

        fetch('http://localhost:8000/Change-Email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Successfully Changed Email!');
                window.location.reload();
            } else {
                switch (data.errorCode){
                    case -2:
                        alert('Email already taken.')
                        break;
                    default:
                        alert('Invalid email format.');
                        break;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error changing your email.');
        });
    };

    const changePhone = (e) => {
        e.preventDefault();

        if (containsComma(newPhone)) {
            alert("Commas are not allowed!");
            return;
        }

        if (!newPhone) {
            alert("Please enter a phone number.");
            return;
        }

        const userID = sessionStorage.getItem('userID');

        const sendData = {
            ID: userID,
            phone: newPhone
        };

        fetch('http://localhost:8000/Change-Phone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Successfully changed phone!');
                window.location.reload();
            } else {
                alert('Invalid phone format.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error changing your phone.');
        });
    };

    const changeAddress = (e) => {
        e.preventDefault();

        if (containsComma(newAddress) || containsComma(newApt)) {
            alert("Commas are not allowed!");
            return;
        }

        if (!newAddress) {
            alert("Please enter an Address.");
            return;
        }

        if (!newApt){
            setApt('');
        }

        const userID = sessionStorage.getItem('userID');

        const sendData = {
            ID: userID,
            address: newAddress,
            apt: newApt
        };

        fetch('http://localhost:8000/Change-Address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Successfully changed address!');
                window.location.reload();
            } else {
                alert('Invalid email address.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error changing your address.');
        });
    };

    const changePassword = (e) => {
        e.preventDefault();

        if (containsComma(newNewPassword) || containsComma(newOldPassword)) {
            alert("Commas are not allowed!");
            return;
        }

        if (!newNewPassword) {
            alert("Please enter a new password.");
            return;
        }

        if (!newOldPassword) {
            alert("Please enter a the old password.");
            return;
        }

        if (newOldPassword === newNewPassword){
            alert("New password cannot be old password.");
            return;
        }

        const userID = sessionStorage.getItem('userID');

        const sendData = {
            ID: userID,
            newPassword: newNewPassword,
            oldPassword: newOldPassword
        };

        fetch('http://localhost:8000/Change-Password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Successfully changed the Password!');
                window.location.reload();
            } else {
                switch (data.errorCode){
                    case -2:
                        alert('Old password is incorrect.')
                        break;
                    default:
                        alert('Error changing the password.');
                        break;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error changing the password.');
        });
    };

    const deleteAccount = (e) => {
        e.preventDefault();

        if(confirmDelete !== 'delete'){
            alert('Please enter delete all lowercase.');
            return;
        }

        const userID = sessionStorage.getItem('userID');

        const sendData = {
            ID: userID
        };

        fetch('http://localhost:8000/Delete-Account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Successfully deleted your account');
                sessionStorage.removeItem('userID');
                window.location.href = '/';                
            } else {
                alert('There was an error deleting the account.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error deleting the account.');
        });
    };
    
    const giveAdmin = (e) => {
        e.preventDefault();

        if (containsComma(newAdminEmail)) {
            alert("Commas are not allowed!");
            return;
        }

        if (!newAdminEmail) {
            alert("Please enter an email.");
            return;
        }

        const sendData = {
            email: newAdminEmail
        };

        fetch('http://localhost:8000/Give-Admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Successfully Changed Email!');
            } else {
                switch (data.errorCode){
                    case -2:
                        alert('Email not found.')
                        break;
                    default:
                        alert('Invalid email format.');
                        break;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error changing your email.');
        });
    };

    const logout = () => {
        sessionStorage.removeItem('userID');
        window.location.href = '/';
    };


    return (
        <div className="profileBody">
            <div className="options">
                <a href="#User">User Settings</a>
                <a href="#OrderHistory">Order History</a>
                {admin && <a href="#Admin">Admin Settings</a>}
                <button id="logout" onClick={logout}>Logout</button></div>
            <div className="menuCont">
            <div id="User" className="userSettings">
                <h1>User Settings</h1>

                <div className="inputCont">
                    <p>Change Name: {name}</p>
                    <input type="text" placeholder="Name" value={newName} onChange={(e) => setName(e.target.value)} required />
                    <button onClick={changeName}>Submit</button>
                </div>

                <div className="inputCont">
                    <p>Email: {email}</p>
                    <input type="text"  placeholder="Email" value={newEmail} onChange={(e) => setEmail(e.target.value)} required />
                    <button onClick={changeEmail}>Submit</button>
                </div>

                <div className="inputCont">
                    <p>Phone: {phone}</p>
                    <input type="text"  placeholder="Phone" value={newPhone} onChange={(e) => setPhone(e.target.value)} required />
                    <button onClick={changePhone}>Submit</button>
                </div>

                <div className="inputCont">
                    <p>Change Address: {address}, {apt}</p>
                    <input type="text"  placeholder="Address" value={newAddress} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="text"  placeholder="Apt (optional)" value={newApt} onChange={(e) => setApt(e.target.value)} />
                    <button onClick={changeAddress}>Submit</button>
                </div>

                <div className="inputCont">
                    <p>Change Password</p>
                    <input type="password"  placeholder="Old Password" value={newOldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                    <input type="password"  placeholder="New Password" value={newNewPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <button onClick={changePassword}>Submit</button>
                </div>

                <div className="inputCont">
                    <p>Delete Account?</p>
                    <input type="text"  placeholder="Type 'delete'" value={confirmDelete} onChange={(e) => setConfirmDelete(e.target.value)} required />
                    <button id='delete' onClick={deleteAccount}>Delete</button>
                </div>
            </div>

            <div id="OrderHistory" className="orderHistory">
                order history
            </div>
            {admin && (
                <div id="Admin" className="adminSettings">
                    <h1>Admin Settings</h1>
                    <div className="inputCont">
                        <p>Give Admin</p>
                        <input type="text"  placeholder="Email" value={newAdminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
                        <button onClick={giveAdmin}>Submit</button>
                    </div>

                </div>
            )}
            </div>
        </div>
    );
}
