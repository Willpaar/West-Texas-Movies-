<div className="upcomingMoviesCont">
    <h1>Upcoming Movies</h1>
    {upcomingMovies.length === 0 ? (
        <p>No upcoming movies right now!</p>
    ) : (
        <div className="moviesGrid">
            {upcomingMovies.map((movie, index) => (
                <div className="movieCard" key={index}>
                    <img src={`/${movie.img}`} alt={movie.title} className="movieImage" />
                    <h3>{movie.title}</h3>
                    {movie.showtimes.length > 0 && movie.showtimes[0].date && (
                        <p className="releaseDate">Releases: {movie.showtimes[0].date}</p>
                    )}
                </div>
            ))}
        </div>
    )}
</div>
