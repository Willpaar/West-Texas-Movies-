import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import BrowseBody from '../components/BrowseBody.jsx';

const Browse = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/get-movies')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMovies(data.movies);
                } else {
                    console.error('Failed to fetch movies:', data.errorCode);
                }
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div>
            <Header />
            <BrowseBody movies={movies} />
        </div>
    );
};

export default Browse;
