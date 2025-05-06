import React, { useState, useEffect, useRef } from 'react';
import './SearchBody.css';

export default function SearchBody() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex]       = useState(0);
  const cardRefs = useRef([]); 
  const [search, setSearch] = useState('')

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
          backgroundImage: movies[activeIndex]
            ? `url(/${movies[activeIndex].img})`
            : 'none'
        }}
      />
      <input className='inputTag' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search movies...'/>
      <div className="moviesCont">
        {movies.length === 0 ? (
          <p>No upcoming movies right now!</p>
        ) : (
          <div className="carousel">
            <div className="moviesGrid">
              {movies.filter(movie=>movie.title.toLowerCase().includes(search)).map((movie, i) => (
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

