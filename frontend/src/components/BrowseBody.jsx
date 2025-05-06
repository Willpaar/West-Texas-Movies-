import React from 'react';
import './BrowseBody.css';
import { useEffect, useState } from 'react';


export default function BrowseBody({ movies }) {
    const nonUpcomingMovies = movies.filter(movie => movie.upcoming === "0" || movie.upcoming === 0);
    const [reviews, setReviews] = useState({});
    
    const containsComma = (str) => str.includes(',');

    const addReview = (e, movieId) => {
        e.preventDefault();
    
        const review = reviews[movieId];
    
        if (!review) {
            alert("Please add a review");
            return;
        }
    
        if (containsComma(review)) {
            alert("Inputs must not contain commas.");
            return;
        }
    
        const sendData = {
            review: review,
            movieId: movieId,
        };
    
        fetch('http://localhost:8000/Add-Review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Review Added.');
                    window.location.reload();
                    // Optionally clear review field
                    setReviews({ ...reviews, [movieId]: '' });
                } else {
                    alert("Error adding review.");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error adding review.');
            });
    };
    
    


    console.log(movies);
    return (
        <div className="browseBody">
            <div className="movies-list">
                {nonUpcomingMovies.length > 0 ? (
                    nonUpcomingMovies.map((movie, index) => (
                        <div key={index} className="movie-card">
                            <img src={`/${movie.img}`} alt={movie.title} className="movie-img" />
                            <div className="showtimes">
                                {movie.showtimes.map((showtime, idx) => (
                                    <div key={idx} className="showtime">
                                        <strong>{showtime.location}</strong> - {showtime.date}
                                        <div className="times">
                                            {showtime.times.split(' ').map((time, i) => (
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
                            <p className="movie-description">{movie.description}</p>
                            <input
                                type="text"
                                placeholder="Add a review"
                                value={reviews[movie.showtimes[0]?.id] || ''}
                                onChange={(e) =>
                                    setReviews({ ...reviews, [movie.showtimes[0]?.id]: e.target.value })
                                }
                                required
                            />

                            <button onClick={(e) => addReview(e, movie.showtimes[0]?.id)}>Add Review</button>

                            <div className="reviews">
                                <h4>Reviews:</h4>
                                {movie.reviews
                                    ? movie.reviews.split('|').map((review, i) => (
                                        <div key={i} className="review">
                                            <p>{review.trim()}</p>
                                            <hr />
                                        </div>
                                    ))
                                    : <p>No reviews yet.</p>
                                }
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
