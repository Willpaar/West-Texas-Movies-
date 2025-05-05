import React, { useState, useEffect, useRef } from 'react';
import './SearchBody.css';

export default function SearchBody() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [activeIndex, setActiveIndex]       = useState(0);
  const cardRefs = useRef([]); 
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/get-movies')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const filtered = data.movies.filter(m => parseInt(m.upcoming, 10) === 1);
          setUpcomingMovies(filtered);
        }
      });
  }, []);

  // whenever activeIndex changes, scroll that card into center
  useEffect(() => {
    const el = cardRefs.current[activeIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [activeIndex]);

  return (
    <div className="searchBody">
      {/* blurred backdrop */}
      <div
        className="carousel-bg"
        style={{
          backgroundImage: upcomingMovies[activeIndex]
            ? `url(/${upcomingMovies[activeIndex].img})`
            : 'none'
        }}
      />
      <input className='inputTag' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search movies...'/>
      <div className="upcomingMoviesCont">
        {upcomingMovies.length === 0 ? (
          <p>No upcoming movies right now!</p>
        ) : (
          <div className="carousel">
            <div className="moviesGrid">
              {upcomingMovies.filter(movie=>movie.title.toLowerCase().includes(search)).map((movie, i) => (
                <div
                  key={i}
                  ref={el => (cardRefs.current[i] = el)}
                  className={`movieCard${i === activeIndex ? ' active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <img
                    src={`/${movie.img}`}
                    alt={movie.title}
                    className="movieImage"
                  />
                  <h2>{movie.title}</h2>
                  {movie.showtimes[0]?.date && (
                    <p className="releaseDate">
                      Release Date: {movie.showtimes[0].date}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

