import React from 'react';
import './UpcomingBody.css';
import { useState, useEffect } from 'react';

export default function Upcoming() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/get-movies')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const upcoming = data.movies.filter(movie => parseInt(movie.upcoming) === 1);
                    setUpcomingMovies(upcoming);
                }
            })
            .catch(err => console.error('Error fetching upcoming movies:', err));
    }, []);

    return (
        <div className="upcomingPage">
            <div className="upcomingContainer">
                <h1>Upcoming Movies</h1>
                {upcomingMovies.length === 0 ? (
                    <p>No upcoming movies right now!</p>
                ) : (
                    upcomingMovies.map((movie, index) => (
                        <div className="movieCard" key={index}>
                            <img src={`/${movie.img}`} alt={movie.title} className="movieImage" />
                            <h2>{movie.title}</h2>
                            {movie.showtimes.length > 0 && movie.showtimes[0].date && (
                                <p>Release Date: {movie.showtimes[0].date}</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
