import React from 'react';
import './BrowseBody.css';

export default function BrowseBody({ movies }) {
    const nonUpcomingMovies = movies.filter(movie => movie.upcoming === "0" || movie.upcoming === 0);

    console.log(movies)
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
                                        <strong>{showtime.location}</strong> - {showtime.date}
                                        <div className="times">
                                            {showtime.times.split('   ').map((time, i) => (
                                                <a
                                                    key={i}
                                                    href={`/purchase#id=${showtime.id}&time=${time}`}
                                                    className="showtime-link"
                                                >
                                                    {time}
                                                </a>
                                            ))}
                                        </div>
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
