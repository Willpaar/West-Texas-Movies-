import React from 'react';
import './BrowseBody.css';

export default function BrowseBody({ movies }) {
    const nonUpcomingMovies = movies.filter(movie => movie.upcoming === "0" || movie.upcoming === 0);

    return (
        <div className="browseBody">
            <h1>Browse Movies</h1>

            <div className="movies-list">
                {nonUpcomingMovies.length > 0 ? (
                    nonUpcomingMovies.map((movie, index) => (
                        <div key={index} className="movie-card">
                            <h2>{movie.title}</h2>
                            <img src={`/${movie.img}`} alt={movie.title} className="movie-img" />
                            <div className="showtimes">
                                {movie.showtimes.map((showtime, idx) => (
                                    <div key={idx} className="showtime">
                                        <strong>{showtime.location}</strong> - {showtime.date} at {showtime.times}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>
        </div>
    );
}