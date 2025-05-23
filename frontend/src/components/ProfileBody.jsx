import React, { useEffect, useState } from 'react';
import './ProfileBody.css';

function getTotalFromList(ticketList) {
    return ticketList.reduce((total, ticket) => {
      const num = parseInt(ticket, 10);
      return isNaN(num) ? total : total + num;
    }, 0);
  }

  function getTodaysShowtimesFlat(movies) {
    const today = new Date();
    const todayStr = today.toLocaleDateString('en-US'); // e.g., "5/6/2025"
  
    const flatList = [];
  
    movies.forEach(movie => {
      movie.showtimes.forEach(show => {
        if (show.date === todayStr) {
          flatList.push({
            title: movie.title,
            location: show.location,
            date: show.date,
            times: show.times
          });
        }
      });
    });
  
    return flatList;
  }
  
  
  
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
    const [inputs, setInputs] = useState(['']); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState(null); // Added state to store file data
    const [isUpcoming, setIsUpcoming] = useState(false);  // New state for the checkbox
    const [deleteTitle, setDeleteTitle] = useState('');
    const [deleteDate, setDeleteDate] = useState('');
    const [deleteLocation, setDeleteLocation] = useState('');
    const [orderMovieTitles, setOrderMovieTitles] = useState([]);
    const [orderDates, setOrderDates] = useState([]);
    const [orderTimes, setOrderTimes] = useState([]);
    const [orderLocation, setOrderLocation] = useState([]);
    const [orderNumOfTickets, setOrderNumOfTickets] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [orderNumOfTicketsAll,setOrderNumOfTicketsAll] = useState(0)
    const [movies,setMovies] = useState([])
    const ticketIdx = 0;

    function addInput() {
        setInputs([...inputs, '']); // add a new empty string to the array
    }

    function handleInputChange(index, event) {
        const newInputs = [...inputs];
        newInputs[index] = event.target.value;
        setInputs(newInputs);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedFileName(selectedFile.name);
        if (selectedFile) {
            setFile(selectedFile); // Store the selected file itself, not an object
        }
    };
    
    
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

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

            // Fetch order history
        fetch('http://localhost:8000/Get-Order-History', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: parseInt(userID) })
        })
            .then(response => response.json())
            .then(orderHistory => {
                // Assuming orderHistory is an array of order objects
                const orders = Object.values(orderHistory)[1];

                const titles = [];
                const dates = [];
                const times = [];
                const locations = [];
                const numTickets = [];

                orders.forEach(order => {
                    titles.push(order.movieTitle);
                    dates.push(order.date);
                    times.push(order.time);
                    locations.push(order.location);
                    numTickets.push(order.numTickets);
                });

                setOrderMovieTitles(titles);
                setOrderDates(dates);
                setOrderTimes(times);
                setOrderLocation(locations);
                setOrderNumOfTickets(numTickets);
            
            })
            .catch(err => console.error('Error fetching order history:', err));
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

        if (!newName) {
            alert("Please enter a name.");
            return;
        }

        if (containsComma(newName)) {
            alert("Commas are not allowed!");
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

        if (!newEmail) {
            alert("Please enter an email.");
            return;
        }

        if (containsComma(newEmail)) {
            alert("Commas are not allowed!");
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

        if (!newAddress) {
            alert("Please enter an Address.");
            return;
        }

        if (!newApt){
            setApt('');
        }

        if (containsComma(newAddress) || containsComma(newApt)) {
            alert("Commas are not allowed!");
            return;
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

        if (!newNewPassword) {
            alert("Please enter a new password.");
            return;
        }

        if (!newOldPassword) {
            alert("Please enter a the old password.");
            return;
        }
    
        if (containsComma(newNewPassword) || containsComma(newOldPassword)) {
            alert("Commas are not allowed!");
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

        if (!newAdminEmail) {
            alert("Please enter an email.");
            return;
        }

        if (containsComma(newAdminEmail)) {
            alert("Commas are not allowed!");
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
                alert(`${newAdminEmail} is now an admin.`);
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

    const submitMovie = (e) => {
        e.preventDefault();
    
        if (!title || !file || !date || !description) {
            alert("Please fill in the title, description, file, and date.");
            return;
        }

        if(containsComma(title) || containsComma(file.name)){
            alert("Inputs must not contain commas.")
            return;
        }

        if (!isUpcoming) {
            if (!location || inputs.every(input => input.trim() === '')) {
                alert("For non-upcoming movies, you must select a location and enter at least one time.");
                return;
            }
        }

    
        let sendData = new FormData();
    
        // Add basic movie details to FormData
        sendData.append('description', description)
        sendData.append('title', title);
        sendData.append('filePath', file.name); // File name as filePath
        sendData.append('location', location);
        sendData.append('date', date);  
        sendData.append('times', isUpcoming ? "" : inputs.join(' '));  // Empty times for upcoming movies
        sendData.append('upcoming', isUpcoming ? 1 : 0);  // Mark as upcoming or not
    
        // Add the file content to FormData
        if (file) {
            sendData.append('file', file);  // Append the actual file to be uploaded
        } else {
            alert("Please select a file!");
            return;
        }
    
        // Send the movie data to the backend
        fetch('http://localhost:8000/Add-Movie', {
            method: 'POST',
            body: sendData,  // Send the FormData directly, which includes the file
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Movie added successfully!');
            } else {
                switch (data.errorCode) {
                    case -1:
                        alert("Please change the PNG name.");
                        break;
                    case -2:
                        alert("Please enter a valid time.");
                        break;
                    default:
                        alert("There was an error adding the movie.");
                        break;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error adding the movie.');
        });
    };
    
    const deleteMovie = (e) => {
        e.preventDefault();

        if (!deleteTitle || !deleteLocation || !deleteDate) {
            alert("Please fill in the title, location, and date.");
            return;
        }
    
        if (containsComma(deleteTitle)) {
            alert("Inputs must not contain commas.");
            return;
        }

        const sendData = {
            title: deleteTitle,
            date: deleteDate,
            location: deleteLocation
        };

        // Send the movie data to the backend
        fetch('http://localhost:8000/Delete-Movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensure that we're sending JSON
            },
            body: JSON.stringify(sendData),  // Convert sendData to JSON string
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Movie Deleted successfully!');
            } else {
                alert("Could not find the specified movie, please check that the name, date, and location are correct.");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error deleting the movie.');

        
        });
    };

    const printTickets = () => {
        alert('Tickets Printed!')
    }

    function getReport() {
        fetch('http://localhost:8000/Get-Orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: parseInt(0) })
        })
            .then(response => response.json())
            .then(orderHistory => {
                // Assuming orderHistory is an array of order objects
                const orders = Object.values(orderHistory)[1];

                const titles = [];
                const dates = [];
                const times = [];
                const locations = [];
                const numTickets = [];

                orders.forEach(order => {
                    titles.push(order.movieTitle);
                    dates.push(order.date);
                    times.push(order.time);
                    locations.push(order.location);
                    numTickets.push(order.numTickets);
                });

                setOrderMovieTitles(titles);
                setOrderDates(dates);
                setOrderTimes(times);
                setOrderLocation(locations);
                setOrderNumOfTicketsAll(getTotalFromList(numTickets));

            
            })
            .catch(err => console.error('Error fetching order history:', err));


            fetch('http://localhost:8000/get-movies')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setMovies(getTodaysShowtimesFlat(data.movies));
                    } else {
                        console.error('Failed to fetch movies:', data.errorCode);
                    }
                })
                .catch(error => console.error('Error fetching movies:', error));

            alert(
                "Total number of tickets: " + orderNumOfTicketsAll +
                "\nTotal revenue: $" + (orderNumOfTicketsAll * 10.65).toFixed(2) +
                "\n\nMovies playing today:\n" +
                movies.map(item =>
                  `• ${item.title}\n  Location: ${item.location}\n  Times: ${item.times}`
                ).join("\n\n")
              ); 
    }
    
    return (
        <div className="profileBody relative">
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
                <h1>Order History</h1>
                {orderMovieTitles.length > 0 ? (
                    <div className="order-history-list">
                        {orderMovieTitles.map((title, index) => (
                            <div key={index} className="order-history-item">
                                <h3>{`Tickets to see ${title}:`}</h3>
                                <p><strong>Location:</strong> {orderLocation[index]}</p>
                                <p><strong>Date:</strong> {orderDates[index]}</p>
                                <p><strong>Time:</strong> {orderTimes[index]}</p>
                                <p><strong>Number of Tickets:</strong> {orderNumOfTickets[index]}</p>
                                {(() => {
                                    const ticketCount = Number(orderNumOfTickets[index]);
                                    console.log('ticketCount for index', index, '=', ticketCount);

                                    if (!isNaN(ticketCount) && ticketCount > 0) {
                                        return (
                                            <div className="barcode-list">
                                                {Array.from({ length: ticketCount }).map((_, key) => {
                                                    const path = `/barcodes/barcode${key % 20}.png`;
                                                    console.log(`Rendering barcode img with path: ${path}`);
                                                    return (
                                                        <img
                                                            key={key}
                                                            src={path}
                                                            alt={`Ticket ${key + 1}`}
                                                            className="barcode-img"
                                                        />
                                                    );
                                                })}
                                            </div>
                                        );
                                    } else {
                                        return <p>No tickets found.</p>;
                                    }
                                })()}

                                <img src={`/barcodes/barcode${index}.png`} alt="" />
                                <button onClick={printTickets}>Print Tickets</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
                {admin && (
                    <div id="Admin" className="adminSettings">
                        <h1>Admin Settings</h1>
                        <div className="inputCont">
                        <button onClick={()=>getReport()}>Get Status Report</button>
                        </div>
                        {/* Give Admin Section */}
                        <div className="inputCont">
                            <p>Give Admin</p>
                            <input
                                type="text"
                                placeholder="Email"
                                value={newAdminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                required
                            />
                            <button onClick={giveAdmin}>Submit</button>
                        </div>

                        <div className="inputCont">
                            <h2>Add Movie</h2>

                            <input
                                type="text"
                                placeholder="Movie Title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />

                            <input type="text" 
                            placeholder='Description'
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                            />

                            <div className="choosefile">
                            <p>Choose a cover (.png only)</p>
                            <label htmlFor="fileUpload" className="customFileUpload">Select File</label>
                            <input 
                                type="file"
                                id="fileUpload"
                                accept=".png"
                                onChange={handleFileChange}
                                required
                            />
                            <p className="filenameDisplay">{selectedFileName || "No file selected"}</p>
                            </div>

                            <div className="upcoming">
                                <p>Upcoming?</p>
                                <input
                                    type="checkbox"
                                    checked={isUpcoming}
                                    onChange={(e) => setIsUpcoming(e.target.checked)}
                                />
                            </div>

                            {/* Always show Date */}
                            <input
                                type="date"
                                id="releaseDate"
                                value={date}
                                onChange={handleDateChange}
                                required
                            />

                            {/* Only show Location and Times if NOT Upcoming */}
                            {!isUpcoming && (
                                <>
                                    <select value={location} onChange={handleLocationChange} required>
                                        <option value="" disabled>Select a Location</option>
                                        <option value="Lubbock">Lubbock</option>
                                        <option value="Amarillo">Amarillo</option>
                                        <option value="Snyder">Snyder</option>
                                        <option value="Levelland">Levelland</option>
                                        <option value="Plainview">Plainview</option>
                                        <option value="Abilene">Abilene</option>
                                    </select>

                                    {inputs.map((input, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder="Enter a Time (e.g. 12:00)"
                                            value={input}
                                            onChange={(e) => handleInputChange(index, e)}
                                            required
                                        />
                                    ))}

                                    <button type="button" onClick={addInput}>Add Another Time</button>
                                </>
                            )}

                            <button onClick={submitMovie}>Add Movie</button>
                        </div>

                        <div className="inputCont">
                            <h1>Delete Movie</h1>
                            <input
                                type="text"
                                placeholder="Movie Title"
                                value={deleteTitle}
                                onChange={(e) => setDeleteTitle(e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                id="releaseDate"
                                value={deleteDate}
                                onChange={(e) => setDeleteDate(e.target.value)}
                                required
                            />
                            <select value={deleteLocation} onChange={(e) => setDeleteLocation(e.target.value)} required>
                                <option value="" disabled>Select a Location</option>
                                <option value="Lubbock">Lubbock</option>
                                <option value="Amarillo">Amarillo</option>
                                <option value="Snyder">Snyder</option>
                                <option value="Levelland">Levelland</option>
                                <option value="Plainview">Plainview</option>
                                <option value="Abilene">Abilene</option>
                            </select>
                            
                            <button type="button" onClick={deleteMovie}>Delete Movie</button>
                        </div>


                    </div>
                )}
            </div>
        </div>
    );
}
