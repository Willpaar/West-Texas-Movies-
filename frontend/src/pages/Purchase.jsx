// All imports should be at the top of the file
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import PurchaseBody from '../components/PurchaseBody.jsx';

const Purchasepage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [movieData, setMovieData] = useState(null); // Store movie data
    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        const userID = sessionStorage.getItem('userID');
        const loggedIn = !!userID;
        setIsLoggedIn(loggedIn);

        // Redirect to login if not logged in
        if (!loggedIn && !sessionStorage.getItem('redirected')) {
            sessionStorage.setItem('redirected', 'true'); // prevent double redirect
            alert('You must be logged in to purchase a movie.');
            navigate('/login');
        }
    }, [navigate]);

    // Clear redirect flag when landing on login page
    useEffect(() => {
        sessionStorage.removeItem('redirected');
    }, []);

    // Fetch movie data once the user is logged in and we have the movie ID from the URL hash
    useEffect(() => {
        if (isLoggedIn) {
            const hashParams = new URLSearchParams(window.location.hash.substring(1)); // Get the hash part and parse it as query params
            const movieID = hashParams.get('id'); // Get the 'id' parameter from the hash
            if (movieID) {
                const fetchMovieData = async () => {
                    try {
                        const sendData = {
                            ID: movieID, // Send movie ID in the request body
                        };

                        const response = await fetch('http://localhost:8000/Get-Movie', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(sendData),
                        });

                        const data = await response.json();

                        if (data.success) {
                            setMovieData(data.data); // Assuming the data has a `movie` object
                        } else {
                            console.error('Failed to fetch movie data:', data.errorCode);
                        }
                    } catch (error) {
                        console.error('Error fetching movie data:', error);
                    }
                };
                
                fetchMovieData();
            } else {
                console.error('Movie ID not found in the URL hash');
            }
        }
    }, [isLoggedIn]);

    return (
        <div>
            <Header />
            {isLoggedIn && movieData ? (
                <PurchaseBody movie={movieData} /> // Pass the movie data to PurchaseBody
            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
};

export default Purchasepage;
