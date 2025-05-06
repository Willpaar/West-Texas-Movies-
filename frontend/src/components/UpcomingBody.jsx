// UpcomingBody.js
import React, { useState, useEffect, useRef } from 'react';
import './UpcomingBody.css';

export default function Upcoming() {
  const [movies, setMovies]     = useState([]);
  const [activeIndex, setIndex] = useState(0);
  const trackRef                = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/get-movies')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const list = data.movies.filter(m => +m.upcoming === 1);
          setMovies(list);
          setIndex(0);
        }
      })
      .catch(console.error);
  }, []);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(movies.length - 1, i + 1));

  if (!movies.length) {
    return (
      <p style={{ color:'#fff', textAlign:'center', marginTop:50 }}>
        Loading upcoming movies…
      </p>
    );
  }

  return (
    <div className="upcomingPage">
      <div className="upcomingMoviesCont">
        <div
          className="carousel-bg1"
          style={{ backgroundImage: `url(/${movies[activeIndex].img})` }}
        />
        <button
          className="nav prev"
          onClick={prev}
          disabled={activeIndex === 0}
        >‹</button>
        <button
          className="nav next"
          onClick={next}
          disabled={activeIndex === movies.length - 1}
        >›</button>
      </div>

      <div className="carousel">
        <div className="slider-track" ref={trackRef}>
          {movies.map((m, i) => (
            <div
              key={i}
              className={`movieCard${i === activeIndex ? ' active' : ''}`}
              onClick={() => setIndex(i)}
            >
              <img src={`/${m.img}`} alt={m.title} className="movieImage"/>
              <h2>{m.title}</h2>
              {m.showtimes?.[0]?.date && (
                <p className="releaseDate">
                  Release Date: {m.showtimes[0].date}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
